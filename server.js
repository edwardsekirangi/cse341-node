const express = require("express");
const app = express();

// set port, listen for requests
const port = process.env.PORT || 8080;
require("dotenv").config();
mongoose = require("mongoose");
bodyParser = require("body-parser");
const mongodb = require("./db/connect");
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("process.env.MONGODB_URI");

//inporting using the router in the main file
const usersRoutes = require("./routes/index");
app.use("/users", usersRoutes);

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

//alternative connection method
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({
//             ping: 1,
//         });
//         console.log(
//             "Pinged your deployment. You successfully connected to MongoDB!",
//         );
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

//Serving static files from the 'public' directory
//app.use(express.static("public"));

//example routem
app.get("/", (req, res) => {
    res.send(
        "Hello from the server! Working with pnpm and Express. Write /users to see the users route",
    );
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});

app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + " not found",
    });
});
