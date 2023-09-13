import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        author: {
            type: String, 
            required: true,
        },
        publishYear: {
            type: Number, 
            required: true,
        },
    },
    {
        timestamps: true, //time of creation and time of last update
    }
)
export const Book = mongoose.model("Book", bookSchema);