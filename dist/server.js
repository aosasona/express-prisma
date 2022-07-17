"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
// Load environment variables from .env file
require("dotenv").config();
// Load express
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
const server = http_1.default.createServer(app_1.default);
// Start listening on port
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    // Connect to MONGODB database
    // connect();
    // Connect to REDIS
    //   redisClient
    //     .connect()
    //     .then(() => {
    //       if (process.env.NODE_ENV !== "test") {
    //         console.log("🛠\tRedis - Connection open");
    //       }
    //     })
    //     .catch((err: any) => {
    //       console.log(err);
    //     });
});
