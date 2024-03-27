import DailyTip from "../models/DailyTip.js";

export const getAllDailyTips = async () => {
    const dailyTips = await DailyTip.find();
    return dailyTips;
};

export const getDailyTipById = async (_, { id }) => {
    const dailyTip = await DailyTip.findById(id);
    return dailyTip;
};

export const getDailyTipByPatient = async (_, { patientId }) => {
    const dailyTips = await DailyTip.findOne({ patient: patientId });
    return dailyTips;
};

export const addDailyTip = async (_, { dailyInput }) => {
    const newDailyTip = new DailyTip(dailyInput);
    return await newDailyTip.save();
};

export const updateDailyTip = async (_, { id, dailyTipInput }) => {
    const updatedDailyTip = DailyTip.findByIdAndUpdate(id, dailyTipInput, {
        new: true,
    });
    if (!updatedDailyTip) {
        throw new Error("Daily tip not found");
    }
    return updatedDailyTip;
};

export const deleteDailyTip = async (_, { id }) => {
    const deletedDailyTip = await DailyTip.findByIdAndDelete(id);
    return deletedDailyTip;
};
