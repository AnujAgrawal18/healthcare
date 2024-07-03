import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';


export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    const details = await req.json()
    const collection = db.collection('cart');
    const findResult = await collection.updateOne({ userid: details.email},{$push:{ items:{ img:details.img, title: details.title, price: details.price}}},{upsert: true})
    return NextResponse.json(findResult)
}

