import dayjs from "dayjs";
import ptbr from 'dayjs/locale/pt-br.js';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_NAME);
});

export async function insertRecord (req, res) {
    const entryRecord = req.body;
    console.log(entryRecord);

    try {
        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const now = dayjs().locale(ptbr).format("DD/MM");
        await recordsCollection.insertOne({...entryRecord, date: now});
        
		res.sendStatus(201);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};