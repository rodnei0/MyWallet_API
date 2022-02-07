import dayjs from "dayjs";
import ptbr from 'dayjs/locale/pt-br.js';
import db from "../db.js";
import { stripHtml } from "string-strip-html";
import { ObjectId } from "mongodb";

export async function insertRecord (req, res) {
    try {
        const record = req.body;
        const user = res.locals.user;

        record.description = stripHtml(record.description).result.trim();

        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const now = dayjs().locale(ptbr).format("DD/MM");
        await recordsCollection.insertOne({...record, userId: user._id ,date: now});
        
		res.sendStatus(201);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};

export async function getRecord (req, res) {
    try{
        const user = res.locals.user;

        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const records = await recordsCollection.find({userId: user._id}).toArray();
        
		res.status(201).send(records);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};

export async function deleteRecord (req, res) {
    const { id } = req.params;
    console.log(id);

    try{
        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const record = await recordsCollection.findOne({ _id: new ObjectId(id) });

        if (!record) {
            res.sendStatus(404);
            return
        }
        await recordsCollection.deleteOne({ _id: new ObjectId(id) });
        
		res.sendStatus(200);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};

export async function updateRecord (req, res) {
    const { id } = req.params;

    try{
        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const record = await recordsCollection.findOne({ _id: new ObjectId(id) });

        if (!record) {
            res.sendStatus(404);
            return
        }

        await recordsCollection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
		res.sendStatus(200);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};