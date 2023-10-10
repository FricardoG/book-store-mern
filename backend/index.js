import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoutes.js";
import cors from 'cors';

const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS POLICIY
app.use(cors());  //Option 1

// app.use( //Option 2
//    cors({
//     origin: 'http://localhost:3000',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//    })
// ); 


// Root route
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to your new e-Book Store");
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App successfuly connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
