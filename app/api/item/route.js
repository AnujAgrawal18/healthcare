import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';

export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    let a = await req.json()
    const project = a.name
    const collection = db.collection(project);
    const findResult = await collection.findOne({title : a.title})
    return NextResponse.json(findResult)
}