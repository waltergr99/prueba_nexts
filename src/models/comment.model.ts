import { Schema, model } from "mongoose";
import { Comment } from "../type";

const CommentSchema = new Schema<Comment>(
    {
        idMovie: {
            required: true,
            type: String,
        },
        idUser: {
            required: true,
            type: String,
        },
        comment: {
            required: true,
            type: String,
        },
        qualification: {
            required: true,
            type: Number,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const CommentModel = model("comment_M", CommentSchema);
export default CommentModel;