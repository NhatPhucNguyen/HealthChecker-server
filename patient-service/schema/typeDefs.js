import gql from "graphql-tag";
const typeDefs = gql`
    type Alert {
        id: ID
        patientId: ID
        message: String
        status: String
        updatedAt: String
        createdAt: String
    }
    type DailyInformation{
        id:ID,
        patientId:ID,
        pulseRate:Float,
        bloodPressure:Float,
        weight:Float,
        temperature:Float,
        respiratoryRate:Float,
        updatedAt:String,
        createdAt:String
    }
    input DailyInformationInput{
        patientId:ID,
        pulseRate:Float,
        bloodPressure:Float,
        weight:Float,
        temperature:Float,
        respiratoryRate:Float
    }
    type Symptom{
        label:String,
        value:String
    }
    type SymptomData {
        patientId: ID
        symptoms: [Symptom]
    }
    input AlertInput {
        patientId: ID
        message: String
        status: String
    }
    input SymptomsInput {
        label: String
        value: String
    }
    input SymptomInput {
        patientId: ID
        symptoms: [SymptomsInput]
    }    
    type Query {
        alertsByPatient(patientId: ID): [Alert]
        symptomsByPatient(patientId: ID): SymptomData
        dailyInformationByPatient(patientId: ID): [DailyInformation]
    }
    type Mutation {
        createAlert(alertInput: AlertInput): Alert
        createSymptom(symptomInput: SymptomInput): SymptomData
        createDailyInformation(dailyInformationInput: DailyInformationInput): DailyInformation
        updateDailyInformation(id: ID, dailyInformationInput: DailyInformationInput): DailyInformation
        deleteDailyInformation(id: ID): DailyInformation
    }
`;
export default typeDefs;
