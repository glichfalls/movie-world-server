import { MongoClient } from "mongodb";
import {DB_URL} from "../config/config";

let connection, db;

MongoClient.connect(DB_URL, { useUnifiedTopology: true}, (err, con) => {
    connection = con;
    db = con.db('movie-world');
});

export const insert = (collection: string, data: any) => {
    db.collection(collection).insertOne(data, error => {
        console.log(error ? error.toString() : `insertion to ${collection} successful.`);
    });
};
