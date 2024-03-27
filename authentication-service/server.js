import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./config/mongoose.js";
import { ApolloServer } from "@apollo/server";
import typeDefs from "./schema/typeDefs.js";
import resolvers from "./schema/resolvers.js";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
const app = express();
//connect to MongoDb
connectToMongoDB();
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

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});
const startApolloServer = async () => {
    await server.start();
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req, res }) => ({ req, res }),
        })
    );
};
startApolloServer();
const PORT = process.env.AUTH_PORT || 5001;
app.listen(PORT, () => {
    console.log("Authentication service server is listening on port:", PORT);
});
