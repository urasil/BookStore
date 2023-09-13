import express from "express";
import {PORT,mongoDBUrl} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

//middleware for parsing our request body
app.use(express.json());

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome")
});

// CORS is a security mechanism that ensures web pages can only 
//access resources from domains that have explicitly allowed access
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
// }));


//for each request with prefix of books will be handled by this middleware
app.use("/books", booksRoute);

mongoose.connect(mongoDBUrl)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

