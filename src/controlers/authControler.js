import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_NAME);
});


export async function login (req, res) {
    const userInfo = req.body;

    try {
		const usersCollection = db.collection(process.env.MONGO_USERS);
        const user = await usersCollection.findOne({ email: userInfo.email});

        if(user && bcrypt.compareSync(userInfo.password, user.password)) {
            const token = uuid()

            await db.collection(process.env.MONGO_SESSIONS).insertOne({
                userId: user._id,
                token
            })

            delete userInfo.password;

            res.status(200).send({...user, token: token});
        } else {
            res.status(401).send("E-mail ou senha incorreta!");
            return
        }
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error)
    }
};