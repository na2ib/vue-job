// netlify/functions/get-jobs.js
const { MongoClient } = require("mongodb");

// Gets the MONGO_URI from Netlify environment settings
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

exports.handler = async (event, context) => {
  try {
    await client.connect();

    const database = client.db("VueJobBoardDB");
    const collection = database.collection("jobs");

    const jobs = await collection.find({}).toArray();
    await client.close();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobs),
    };
  } catch (error) {
    console.error("MongoDB Connection/Query Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch jobs from database." }),
    };
  }
};
