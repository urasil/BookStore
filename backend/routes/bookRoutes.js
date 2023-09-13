import express from "express";
import {Book} from "../models/bookModel.js";

//handle the routes with express router
const router = express.Router();

//Route for book model
//post method is usually used to create a new resource
router.post("/", async(request, response) => {
    try{
        if(!request.body.title ||
           !request.body.author ||
           !request.body.publishYear){
                return response.status(400).send({
                    message:"Send all required fields: title, author, publish year",
                })
            }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route to get all books from database
router.get("/", async(request, response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for getting one singular book from database with id
//:id -> in order to tag a parameter
router.get("/:id", async(request, response) => {
    try{
        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json({
            book
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for updating a book

router.put("/:id", async(request, response) => {
    try{
        if(!request.body.title ||
           !request.body.author ||
           !request.body.publishYear){
                return response.status(400).send({
                    message:"Send all required fields: title, author, publish year",
                })
            }
        const {id} = request.params;
        //forgot to put the parameters in and spent at least an hour trying to fix issue
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(201).json({message: "Book updated successfully"});
        }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
    
});

//route for deleting a book

router.delete("/:id", async(request, response) => {
    try{
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(201).json({message: "Book deleted successfully"});


    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;