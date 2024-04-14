import mongoose, { Schema } from "mongoose";
const dailyInformationSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        pulseRate: Number,
        bloodPressure: Number,
        weight: Number,
        temperature: Number,
        respiratoryRate: Number,
    },
    {
        collection: "dailyInformation",
        timestamps: true,
    }
);

export default mongoose.model("DailyInformation", dailyInformationSchema);
