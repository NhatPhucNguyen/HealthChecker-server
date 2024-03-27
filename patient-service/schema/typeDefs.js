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
    input AlertInput {
        patientId: ID
        message: String
        status: String
    }
    type Query {
        alertsByPatient(patientId: ID): [Alert]
    }
    type Mutation {
        createAlert(alertInput: AlertInput): Alert
    }
`;
export default typeDefs;
