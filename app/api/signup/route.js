import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';

export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login-details');
    const project = await req.json()
    const findResult = await collection.updateOne({email: project.email}, {$set: project},{upsert: true})
    const collection2 = db.collection('cart');
    let fr = await collection2.updateOne({userid: project.email , items: []}, {$set:{userid: project.email , items: []} },{upsert: true})
    return NextResponse.json({findResult})
}
