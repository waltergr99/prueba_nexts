import { Schema, model } from "mongoose";
import { User } from "../type";

const UserSchema = new Schema<User>(
    {
        user: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        rol: {
            required: true,
            enum: ["ADMIN", "USUARIO"],
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const UserModel = model("users_M", UserSchema);
export default UserModel;