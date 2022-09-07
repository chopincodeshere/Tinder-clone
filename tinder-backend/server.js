import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import cors from 'cors';

// App config
const app = express();
const port = process.env.PORT || 5000;
const connection_url =
  "mongodb+srv://JilP0:helloworld@cluster0.z4185o4.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
}));

// Db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

// API endpoints
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () =>
  console.log(`Server is up and running on port: ${port}`)
);
