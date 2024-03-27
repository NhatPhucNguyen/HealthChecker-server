import {
    getAlertsByPatientId,
    createAlert,
} from "../resolvers/patient.resolvers.js";

const resolvers = {
    Query: {
        alertsByPatient: getAlertsByPatientId,
    },
    Mutation: {
        createAlert,
    },
};

export default resolvers;
