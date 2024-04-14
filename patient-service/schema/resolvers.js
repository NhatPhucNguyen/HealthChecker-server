import {
    getAlertsByPatientId,
    createAlert,
    createSymptom,
    getNewestSymptomByPatientId,
    createDailyInformation,
    updateDailyInformation,
    deleteDailyInformation,
    getDailyInformationByPatientId,
} from "../resolvers/patient.resolvers.js";

const resolvers = {
    Query: {
        alertsByPatient: getAlertsByPatientId,
        symptomsByPatient: getNewestSymptomByPatientId,
        dailyInformationByPatient: getDailyInformationByPatientId,
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
