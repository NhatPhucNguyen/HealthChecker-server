import Alert from "../models/Alert.js";
export const getAlertsByPatientId = async (_, { patientId }) => {
    const alertsFound = await Alert.find({ patientId: patientId });
    return alertsFound;
};
export const createAlert = async (_, { alertInput }) => {
    const newAlert = new Alert(alertInput);
    return await newAlert.save();
};
