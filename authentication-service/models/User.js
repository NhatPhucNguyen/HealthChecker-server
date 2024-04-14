import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        username: String,
        password: String,
        role: String,
        dateOfBirth: Date,
        address: String,
        city: String,
        phoneNumber: String,
        email: String,
        fullName:String
    },
    {
        timestamps: true,
        collection: "users",
    }
);
export default mongoose.model("User",userSchema);
