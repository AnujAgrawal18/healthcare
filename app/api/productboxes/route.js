import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';

export async function GET(res) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('product-blocks');
    const findResult = await collection.find({}).toArray()
    return NextResponse.json(findResult)
}