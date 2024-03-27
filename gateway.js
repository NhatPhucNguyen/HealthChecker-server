import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { expressMiddleware } from "@apollo/server/express4";
import jwt from "jsonwebtoken";
const app = express();
//set up middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);
const authPort = process.env.AUTH_PORT;
const nursePort = process.env.NURSE_PORT;
const patientPort = process.env.PATIENT_PORT;
const gateway = new ApolloGateway({
    serviceList: [
        { name: "auth", url: `http://localhost:${authPort}/graphql` },
        { name: "patient", url: `http://localhost:${patientPort}/graphql` },
        { name: "nurse", url: `http://localhost:${nursePort}/graphql` },
    ],
    buildService: ({ url }) => {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                request.http.headers.set("role", context.role);
            },
        });
    },
});
const server = new ApolloServer({
    gateway,
});
const startApolloServer = async () => {
    await server.start();
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.cookies["jwt"];
                if (!token) {
                    return { role: null };
                }
                const secretToken = process.env.ACCESS_TOKEN_SECRET;
                const decoded = jwt.verify(token, secretToken);
                return { role: decoded.role };
            },
        })
    );
};
setTimeout(() => {
    startApolloServer();
}, 2000);
const PORT = process.env.GATEWAY_PORT || 5000;
app.listen(PORT, () => {
    console.log("Gateway server is listening on port:", PORT);
});
