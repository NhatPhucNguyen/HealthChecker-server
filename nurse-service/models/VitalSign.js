import mongoose, { Schema } from "mongoose";

const vitalSignSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        temperature: Number,
        bloodPressure: Number,
        heartRate: Number,
        oxygenSaturation: Number,
        respiratoryRate: Number,
    },
    {
        timestamps: true,
        collection: "vitalSigns",
    }
);

export default mongoose.model("VitalSign", vitalSignSchema);
