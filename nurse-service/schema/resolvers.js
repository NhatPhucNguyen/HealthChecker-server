import {
    getAllDailyTips,
    getDailyTipById,
    getDailyTipByPatient,
    addDailyTip,
    updateDailyTip,
    deleteDailyTip,
} from "../resolvers/dailyTip.resolvers.js";
import {
    getAllSymptoms,
    predictDisease,
} from "../resolvers/disease.resolvers.js";
import {
    addVitalSign,
    deleteVitalSign,
    getAllVitalSign,
    getVitalSignById,
    getVitalSignByPatient,
    updateVitalSign,
} from "../resolvers/vitalSign.resolvers.js";

const resolvers = {
    Query: {
        predict: predictDisease,
        vitalSigns: getAllVitalSign,
        vitalSign: getVitalSignById,
        vitalSignByPatient: getVitalSignByPatient,
        symptoms: getAllSymptoms,
        dailyTips: getAllDailyTips,
        dailyTip: getDailyTipById,
        dailyTipByPatient: getDailyTipByPatient,
    },
    Mutation: {
        addVitalSign,
        updateVitalSign,
        deleteVitalSign,
        addDailyTip,
        updateDailyTip,
        deleteDailyTip,
    },
};

export default resolvers;
