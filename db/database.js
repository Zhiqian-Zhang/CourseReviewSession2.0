import { MongoClient } from "mongodb";

function MyMongoDB() {
  const myDB = {};
  const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const DB_NAME = "SessionDB";
  const USERS_COLLECTION = "users";
  const SESSIONS_COLLECTION = "sessions";

  const connect = async () => {
    const client = new MongoClient(URI);
    console.log("Connecting to DB..." + URI);
    const db = client.db(DB_NAME);
    return { client, db };
  };

  myDB.findUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      return await collection.findOne(user);
    } finally {
      client.close();
    }
  };

  myDB.addUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      await collection.insertOne(user);
    } finally {
      client.close();
    }
  };

  myDB.editUser = async user => {
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      await collection.updateOne(
        { username: user.username },
        { $set: { major: user.major, tag: user.tag } },
      );
    } finally {
      client.close();
    }
  };

  myDB.deleteUser = async user => {
    
    const { client, db } = await connect();
    const collection = db.collection(USERS_COLLECTION);
    try {
      console.log("NAME: ")
      console.log(user.username)
      await collection.deleteOne({ username: user.username });
    } finally {
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyMongoDB();
