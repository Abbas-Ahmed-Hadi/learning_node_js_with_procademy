import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
const HOST_NAME = process.env.HOST_NAME ?? "127.0.0.1";
const NODE_ENV = process.env.NODE_ENV ?? "prodection";

if (!process.env.MONGODB_CONN_STR) throw new Exception("Connection String Not Found.");
const MONGODB_CONN_STR = process.env.MONGODB_CONN_STR;

if(!process.env.DB_NAME) throw new Exception("Database Name Not Found.");
const DB_NAME = process.env.DB_NAME;

const DB_CONN_STR = MONGODB_CONN_STR + '/' + DB_NAME;

export {
    SERVER_PORT,
    HOST_NAME,
    NODE_ENV,
    DB_CONN_STR
}
