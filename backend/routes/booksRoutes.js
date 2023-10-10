import express from 'express';
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Creating a new book
router.post("/", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({message: "Please send all required fields: Title, Author and Published Year"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
});

// Getting a complete list of books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message });
    }
});

// Getting a book by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message });
    }
});

// Deleting a book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send({message: "Book deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
});

// Update the book
router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({message: "Please send all required fields: Title, Author and Plubished Year"});
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: "Book not found"});
        }
        return res.status(200).send({message: "Book updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
});

export default router;