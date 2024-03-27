import mongoose, { Schema } from "mongoose";

const alertSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        message: String,
        status: String,
    },
    {
        collection: "alerts",
        timestamps: true,
    }
);

export default mongoose.model("Alert", alertSchema);
