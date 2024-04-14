import Alert from "../models/Alert.js";
import Symptom from "../models/Symptom.js";
import DailyInformation from "../models/DailyInformation.js";
export const getAlertsByPatientId = async (_, { patientId }) => {
    const alertsFound = await Alert.find({ patientId: patientId });
    return alertsFound;
};
export const createAlert = async (_, { alertInput }) => {
    const newAlert = new Alert(alertInput);
    return await newAlert.save();
};

export const createSymptom = async (_, { symptomInput }) => {
    const newSymptom = new Symptom(symptomInput);
    return await newSymptom.save();
};

export const getNewestSymptomByPatientId = async (_, { patientId }) => {
    const newestSymptom = await Symptom.findOne({ patientId: patientId }).sort({
        createdAt: -1,
    });
    return newestSymptom;
};

export const createDailyInformation = async (_, { dailyInformationInput }) => {
    const newDailyInformation = new DailyInformation(dailyInformationInput);
    return await newDailyInformation.save();
};

export const getDailyInformationByPatientId = async (_, { patientId }) => {
    const dailyInformation = await DailyInformation.find({
        patientId: patientId,
    });
    return dailyInformation;
};

export const updateDailyInformation = async (
    _,
    { id, dailyInformationInput }
) => {
    const updatedDailyInformation = await DailyInformation.findByIdAndUpdate(
        id,
        dailyInformationInput,
        { new: true }
    );
    if (!updatedDailyInformation) {
        throw new Error("Daily information not found");
    }
    return updatedDailyInformation;
};

export const deleteDailyInformation = async (_, { id }) => {
    const deletedDailyInformation = await DailyInformation.findByIdAndDelete(
        id
    );
    return deletedDailyInformation;
};
