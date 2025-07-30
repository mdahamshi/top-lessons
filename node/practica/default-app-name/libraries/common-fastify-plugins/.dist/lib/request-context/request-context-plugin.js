"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const node_crypto_1 = require("node:crypto");
const global_context_1 = require("@practica/global-context");
const REQUEST_ID_HEADER = 'x-request';
function RequestContextPlugin(fastify, _options, next) {
    fastify.addHook('onRequest', (request, reply, hookIsDone) => {
        let requestId;
        if (Array.isArray(request.headers[REQUEST_ID_HEADER])) {
            const [firstRequestId] = request.headers[REQUEST_ID_HEADER];
            requestId = firstRequestId;
        }
        else {
            requestId = request.headers[REQUEST_ID_HEADER];
        }
        if (!requestId) {
            requestId = (0, node_crypto_1.randomUUID)();
            request.headers[REQUEST_ID_HEADER] = requestId;
        }
        // // reply.header[REQUEST_ID_HEADER] = requestId;
        const currentContext = (0, global_context_1.context)().getStore();
        if (currentContext) {
            currentContext.requestId = requestId;
            hookIsDone();
            return;
        }
        (0, global_context_1.context)().run({ requestId }, hookIsDone);
    });
    next();
}
exports.RequestContext = (0, fastify_plugin_1.default)(RequestContextPlugin);
