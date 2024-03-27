import mongoose from "mongoose";
import "dotenv/config";
const connectToMongoDB = () => {
    const mongoString =
        process.env.DB_URI || "mongodb://127.0.0.1:27017/group-project";
    mongoose.connect(mongoString);
    const db = mongoose.connection;
    db.on("error", (err) => {
        console.log(err);
    });
    db.once("connected", () => {
        console.log("Database connected ...");
    });
    return db;
};
export default connectToMongoDB;
