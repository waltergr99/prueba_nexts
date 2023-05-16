import { Schema, model } from "mongoose";
import { Movie } from "../type";

const MovieSchema = new Schema<Movie>(
    {
        idUser: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String,
        },
        qualification: {
            required: true,
            type: Number,
        },
        status: {
            required: true,
            enum: ["PENDIENTE", "ACEPTADO"],
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const MovieModel = model("movie_M", MovieSchema);
export default MovieModel;