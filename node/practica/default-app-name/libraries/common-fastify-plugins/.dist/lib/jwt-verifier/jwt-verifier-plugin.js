"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTVerifier = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const userPropertyName = 'user';
const JWTVerifierPlugin = (app, options, pluginDefinitionIsDone) => {
    app.decorateRequest(userPropertyName, null);
    app.addHook('onRequest', (request, reply, onRequestIsDone) => {
        const verificationResult = verifyTokenOnRequest(request, options.secret);
        if (!verificationResult.success) {
            reply.status(401).send();
        }
        else {
            request[userPropertyName] = verificationResult.user;
        }
        onRequestIsDone();
    });
    pluginDefinitionIsDone();
};
const verifyTokenOnRequest = (request, secret) => {
    const authenticationHeader = getAuthenticationHeaderValue(request);
    if (!authenticationHeader) {
        return { success: false };
    }
    let token;
    // A token comes in one of two forms: 'token' or 'Bearer token'
    const authHeaderParts = authenticationHeader.split(' ');
    if (authHeaderParts.length > 2) {
        // It should have 1 or 2 parts (separated by space), the incoming string has unknown structure
        return { success: false };
    }
    if (authHeaderParts.length === 2) {
        [, token] = authHeaderParts;
    }
    else {
        token = authenticationHeader;
    }
    try {
        const JWTVerificationResponse = jsonwebtoken_1.default.verify(token, secret);
        if (!isJwtObjectPayload(JWTVerificationResponse)) {
            return { success: false };
        }
        return { success: true, user: JWTVerificationResponse.data };
    }
    catch (error) {
        return { success: false };
    }
};
function isJwtObjectPayload(value) {
    return typeof value === 'object' && value !== null && 'data' in value;
}
function getAuthenticationHeaderValue(request) {
    if (request.headers.authorization) {
        return request.headers.authorization;
    }
    if (request.headers.Authorization) {
        if (Array.isArray(request.headers.Authorization)) {
            if (request.headers.Authorization.length === 0) {
                return undefined;
            }
            return request.headers.Authorization[0];
        }
        return request.headers.Authorization;
    }
    return undefined;
}
exports.JWTVerifier = (0, fastify_plugin_1.default)(JWTVerifierPlugin);
