import dayjs from "dayjs";
import ptbr from 'dayjs/locale/pt-br.js';
import db from "../db.js";
export async function insertRecord (req, res) {
    try {
        const entryRecord = req.body;
        const user = res.locals.user;
        
        const recordsCollection = db.collection(process.env.MONGO_RECORDS);
        const now = dayjs().locale(ptbr).format("DD/MM");
        await recordsCollection.insertOne({...entryRecord, userId: user._id ,date: now});
        
		res.sendStatus(201);
    } catch (error) {
        res.status(500).send('A culpa foi do estagiário');
        console.log(error);
    }
};

// export async function getRecord (req, res) {


//     try{
//         const recordsCollection = db.collection(process.env.MONGO_RECORDS);
//         const now = dayjs().locale(ptbr).format("DD/MM");
//         await recordsCollection.insertOne({...entryRecord, date: now});
        
// 		res.sendStatus(201);
//     } catch (error) {
//         res.status(500).send('A culpa foi do estagiário');
//         console.log(error);
//     }
// };