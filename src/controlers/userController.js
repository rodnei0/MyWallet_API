import bcrypt from 'bcrypt';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_NAME);
});

export async function signup (req, res) {
    const userInfo = req.body;

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
};