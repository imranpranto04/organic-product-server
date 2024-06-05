const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://imranprantoofficial:5eRVIofssY06nqPa@organic-product.6lhklbu.mongodb.net/?retryWrites=true&w=majority&appName=organic-product";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productDB = client.db("productDB");
    const userDB = client.db("userDB");
    const itemsCollection = productDB.collection("itemsCollection");
    const userCollection = userDB.collection("userCollection");

    // product
    app.post("/items", async (req, res) => {
      const itemsData = req.body;
      const result = await itemsCollection.insertOne(itemsData);
      res.send(result);
    });
    app.get("/items", async (req, res) => {
      const itemsData = itemsCollection.find();
      const result = await itemsData.toArray();
      res.send(result);
    });

    app.get("/items/:id", async (req, res) => {
      const id = req.params.id;
      const itemsData = await itemsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(itemsData);
    });

    app.patch("/items/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await itemsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      res.send(result);
    });

    // app.delete("/items/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const result = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
    //   res.send(result);
    // });

    console.log("You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("route is working");
});

app.listen(port, (req, res) => {
  console.log("App is listening on port :", port);
});

// imranprantoofficial 5eRVIofssY06nqPa
