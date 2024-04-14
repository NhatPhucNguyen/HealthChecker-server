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
    }
    type Mutation {
        createAlert(alertInput: AlertInput): Alert
        createSymptom(symptomInput: SymptomInput): SymptomData
    }
`;
export default typeDefs;
