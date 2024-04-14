import gql from "graphql-tag";
const typeDefs = gql`
    type Response {
        isSuccess: Boolean
        message: String
        token: String
    }
    type User {
        id: ID
        username: String
        role: String
        dateOfBirth: String
        address: String
        city: String
        phoneNumber: String
        email: String
        createdAt: String
        updatedAt: String
        fullName:String
    }
    input LoginInput {
        username: String
        password: String
    }
    input RegisterInput {
        username: String
        password: String
        role: String
        dateOfBirth: String
        address: String
        city: String
        phoneNumber: String
        email: String,
        fullName:String
    }
    type Query {
        logout: Response!
        validateToken: Response!
        patients: [User]
    }
    type Mutation {
        register(registerInput: RegisterInput): Response!
        login(loginInput: LoginInput): Response!
    }
`;

export default typeDefs;
