const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

// Initialize app & middlewares
const app = express();
app.use(express.json());

// Set up db connection & port
let port = process.env.PORT;
let db;

const setUpPort = err => {
  if (err) {
    console.log("Failed to connect to db: ", err);
    return;
  }

  if (!port) {
    port = 3000;
  }

  try {
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
      db = getDb();
    });
  } catch (err) {
    console.error(err);
  }
};

connectToDb(setUpPort);

// Routes
app.get("/books", (req, res) => {
  const page = req.query.page || 0;
  const docsPerLoad = 3;
  const docsToSkip = page * docsPerLoad;
  const books = [];

  db.collection("books")
    .find()
    .sort({ title: 1 })
    .skip(docsToSkip)
    .limit(docsPerLoad)
    .forEach(book => books.push(book))
    .then(() => res.status(200).json(books))
    .catch(error =>
      res.status(500).json({ errorMsg: "Failed to get books", error })
    );
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    res.status(500).json({ errorMsg: "Invalid book id" });
  }

  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then(doc => res.status(200).json(doc))
    .catch(error =>
      res.status(500).json({ errorMsg: "Failed to get book", error })
    );
});

app.post("/books", async (req, res) => {
  try {
    const book = req.body;
    const existingBook = await db
      .collection("books")
      .findOne({ title: book.title });

    if (existingBook)
      return res.status(500).json({ errorMsg: "Book already exist" });

    const result = await db.collection("books").insertOne(book);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ errorMsg: "Failed to insert book" }, error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(500).json({ errorMsg: "Invalid book id" });
    }

    const result = await db
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errorMsg: "Failed to delete book", error });
  }
});

app.patch("/books/:id", (req, res) => {
  const id = req.params.id;
  const updatesObj = req.body;

  if (!ObjectId.isValid(id)) {
    res.status(500).json({ errorMsg: "Invalid book id" });
  }

  db.collection("books")
    .updateOne({ _id: new ObjectId(id) }, { $set: updatesObj })
    .then(result => res.status(200).json(result))
    .catch(error =>
      res.status(500).json({ errorMsg: "Failed to update book", error })
    );
});
