import { NextResponse} from "next/server";
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'FashionMartdb';

export async function POST(req) {
    await client.connect();
    const db = client.db(dbName);
    const userQuery = await req.json()
    const query = userQuery.input
    // const collection = db.collection(project);
    // const findResult = await collection.find({}).toArray()
    // return NextResponse.json(findResult)
  if (query.includes('search')) {
    const searchTerm = query.replace(/search|find/gi, '').trim();
    const collection = db.collection(searchTerm);
    const findResult = await collection.find({}).toArray()
    console.log(findResult)
    return NextResponse.json(findResult)
  }

//   if (userQuery.toLowerCase().includes('add to cart')) {
//     const productName = userQuery.replace(/add to cart/gi, '').trim();
//     // Find product ID (mocked)
//     const products = await axios.get(`/api/products?search=${productName}`);
//     const productId = products.data[0]?._id;
//     if (productId) {
//       await axios.post('/api/cart/add', { userId: 'user123', productId });
//       return { message: `${productName} added to your cart.` };
//     }
//   }

//   if (userQuery.toLowerCase().includes('checkout')) {
//     await axios.post('/api/cart/checkout', { userId: 'user123' });
//     return { message: 'Checkout complete! Thank you.' };
//   }

//   if (userQuery.toLowerCase().includes('show cart')) {
//     const response = await axios.get('/api/cart?userId=user123');
//     return response.data;
//   }

  return  NextResponse.json({ message: "I'm sorry, I didn't understand your request." })
}
