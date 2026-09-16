import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
const HOST_NAME = process.env.HOST_NAME ?? "127.0.0.1";
const NODE_ENV = process.env.NODE_ENV ?? "prodection";

export {
    SERVER_PORT,
    HOST_NAME,
    NODE_ENV
}
