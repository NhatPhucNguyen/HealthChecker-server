import {
    getAlertsByPatientId,
    createAlert,
    createSymptom,
    getNewestSymptomByPatientId,
} from "../resolvers/patient.resolvers.js";

const resolvers = {
    Query: {
        alertsByPatient: getAlertsByPatientId,
        symptomsByPatient: getNewestSymptomByPatientId,
    },
    Mutation: {
        createAlert,
        createSymptom,
    },
};

export default resolvers;
