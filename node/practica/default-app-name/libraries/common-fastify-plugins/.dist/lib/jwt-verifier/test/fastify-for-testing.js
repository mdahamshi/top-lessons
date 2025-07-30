"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopTestServer = exports.startTestServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const jwt_verifier_plugin_1 = require("../jwt-verifier-plugin");
let httpServer;
const startTestServer = async (JWTSecret) => {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(jwt_verifier_plugin_1.JWTVerifier, { secret: JWTSecret });
    app.get('/', async () => ({ message: 'Hello, world!' }));
    await app.listen({ port: 3000 });
    httpServer = app.server;
};
exports.startTestServer = startTestServer;
const stopTestServer = async () => {
    if (httpServer) {
        await httpServer.close();
    }
};
exports.stopTestServer = stopTestServer;
