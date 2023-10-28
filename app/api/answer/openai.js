import { connectToDB } from '@utils/database';
const ChatGPT = require('chatgpt');
const chatgpt = new ChatGPT();

const query = await chatgpt.generateQuery('Find all of the customers who have ordered a product in the category "Clothes" and who have spent more than $220.');

const MongoClient = require('mongodb').MongoClient;
const ChatGPT = require('chatgpt');

const client = new MongoClient('mongodb://localhost:27017/my_database');

async function main() {
    const db = await client.connect();
    const chatgpt = new ChatGPT();

    const query = await chatgpt.generateQuery('Find all of the customers who have ordered a product in the category "Clothes" and who have spent more than $220.');

    const results = await db.collection('orders').find(query);

    for (const result of results) {
        console.log(result);
    }
}

main();