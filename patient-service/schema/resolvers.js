import {
    getAlertsByPatientId,
    createAlert,
    createSymptom,
    getNewestSymptomByPatientId,
    createDailyInformation,
    updateDailyInformation,
    deleteDailyInformation,
    getDailyInformationByPatientId,
    getDailyInformationById,
} from "../resolvers/patient.resolvers.js";

const resolvers = {
    Query: {
        alertsByPatient: getAlertsByPatientId,
        symptomsByPatient: getNewestSymptomByPatientId,
        dailyInformationByPatient: getDailyInformationByPatientId,
        dailyInformation: getDailyInformationById,
    },
    Mutation: {
        createAlert,
        createSymptom,
        createDailyInformation,
        updateDailyInformation,
        deleteDailyInformation,
    },
};

export default resolvers;
