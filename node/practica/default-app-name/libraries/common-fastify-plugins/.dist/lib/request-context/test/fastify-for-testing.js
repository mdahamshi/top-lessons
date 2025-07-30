"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopTestServer = exports.startTestServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const request_context_plugin_1 = require("../request-context-plugin");
let httpServer;
const startTestServer = async (callbackOnRequest) => {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(request_context_plugin_1.RequestContext);
    app.get('/example-route', async (req, res) => {
        callbackOnRequest();
        return res.status(200).send({ message: 'Hello, world!' });
    });
    await app.listen({ port: 3001 });
    httpServer = app.server;
};
exports.startTestServer = startTestServer;
const stopTestServer = async () => {
    if (httpServer) {
        await httpServer.close();
    }
};
exports.stopTestServer = stopTestServer;
