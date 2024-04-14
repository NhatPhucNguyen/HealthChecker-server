import Alert from "../models/Alert.js";
import Symptom from "../models/Symptom.js";
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
    const newestSymptom = await Symptom.findOne({ patientId: patientId }).sort({ createdAt: -1 });
    return newestSymptom;
}