import mongoose, { Schema } from "mongoose";
const symptomSchema = new Schema(
    {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        symptoms: [Object],
    },
    {
        collection: "symptoms",
        timestamps: true,
    }
);
export default mongoose.model("Symptom", symptomSchema);
