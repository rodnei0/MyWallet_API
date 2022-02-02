import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
// import dayjs from "dayjs";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_NAME);
});

const userSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().required(),
});

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().required(),
});

app.post("/login", async (req, res) => {
    const userInfo = req.body;
    const validation = userSchema.validate(userInfo, { abortEarly: false });

    if (validation.error) {
        validation.error.details.map(error => console.log(error));
        res.status(422).send("Preencha os campos corretamente!");
        return
    }

    try {
		const usersCollection = db.collection(process.env.MONGO_USERS);
        const user = await usersCollection.findOne({ email: userInfo.email});

        if(user && bcrypt.compareSync(userInfo.password, user.password)) {
            const token = uuid()

            await db.collection(process.env.MONGO_SESSIONS).insertOne({
                userId: user._id,
                token
            })

            res.status(200).send(token);
        } else {
            res.status(401).send("E-mail ou senha incorreta!");
            return
        }
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error)
    }
});

app.post("/sign-up", async (req, res) => {
    const userInfo = req.body;
    const validation = signupSchema.validate(userInfo, { abortEarly: false });

    if (validation.error) {
        validation.error.details.map(error => console.log(error));
        res.sendStatus(422);
        return
    }
    
    try {
        const usersCollection = db.collection(process.env.MONGO_USERS);
        const user = await usersCollection.findOne({ email: userInfo.email });
        if (user) {
            res.status(409).send("E-mail já cadastrado!");
            return
        }

        const passwordHash = bcrypt.hashSync(userInfo.password, 10);
        await usersCollection.insertOne({...userInfo, password: passwordHash});
        
		res.sendStatus(201);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
});


app.listen(5000);