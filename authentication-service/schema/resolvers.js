import {
    login,
    logout,
    register,
    validateToken,
} from "../resolvers/auth.resolvers.js";

const resolvers = {
    Query: {
        logout: logout,
        validateToken: validateToken,
    },
    Mutation: {
        register: register,
        login: login,
    },
};

export default resolvers;
