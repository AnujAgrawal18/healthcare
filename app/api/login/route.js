
import { MongoClient } from 'mongodb';
import { NextResponse} from "next/server";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';


export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    const login = await req.json()
    const collection = db.collection('login-details');
    const findResult = await collection.findOne({ email: login.email ,  password: login.password})
    return NextResponse.json({login, findResult})
}