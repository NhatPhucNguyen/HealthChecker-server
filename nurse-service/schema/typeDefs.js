import gql from "graphql-tag";
const typeDefs = gql`
    type VitalSign {
        id: ID
        patient: ID
        temperature: Float
        bloodPressure: Int
        heartRate: Int
        oxygenSaturation: Int
        respiratoryRate: Int
        updatedAt: String
    }
    type DailyTip {
        id: ID
        patient: ID
        title: String
        content: String
        reference: String
    }
    type Disease {
        disease: String
        description: String
    }
    type Symptom {
        label: String
        value: String
    }
    input VitalSignInput {
        patient: ID
        temperature: Float
        bloodPressure: Int
        heartRate: Int
        oxygenSaturation: Int
        respiratoryRate: Int
    }
    input DailyTipInput {
        patient: ID
        title: String
        content: String
        reference: String
    }
    type Query {
        vitalSigns: [VitalSign]
        vitalSign(id: ID): VitalSign
        vitalSignByPatient(patientId: ID): [VitalSign]
        symptoms: [Symptom]
        predict(symptoms: [String]!): [Disease]
        dailyTips: [DailyTip]
        dailyTip(id:ID): DailyTip
        dailyTipByPatient(patientId:ID): [DailyTip]
    }
    type Mutation {
        addVitalSign(vitalSignInput: VitalSignInput): VitalSign!
        deleteVitalSign(id: ID): VitalSign!
        updateVitalSign(id: ID, vitalSignInput: VitalSignInput): VitalSign!
        addDailyTip(dailyTipInput: DailyTipInput): DailyTip!
        updateDailyTip(id: ID, dailyTipInput: DailyTipInput): DailyTip!
        deleteDailyTip(id: ID): DailyTip!
    }
`;

export default typeDefs;
