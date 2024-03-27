import mongoose, { Schema } from "mongoose";

const dailyTipSchema = new Schema(
    {
        title: String,
        content: String,
        reference: String,
        patient: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },
    {
        collection: "dailyTips",
        timestamps: true,
    }
);

export default mongoose.model("DailyTip", dailyTipSchema);
