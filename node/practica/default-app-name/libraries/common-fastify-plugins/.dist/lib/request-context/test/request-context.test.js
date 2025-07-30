"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const global_context_1 = require("@practica/global-context");
const fastify_for_testing_1 = require("./fastify-for-testing");
describe('JWTVerifier plugin', () => {
    beforeAll(async () => { });
    afterAll(async () => {
        await (0, fastify_for_testing_1.stopTestServer)();
    });
    test('When a function is called by some route, then the context store has all the mandatory properties', async () => {
        // Arrange
        let currentContext;
        const calledOnRequest = () => {
            currentContext = (0, global_context_1.context)().getStore();
        };
        await (0, fastify_for_testing_1.startTestServer)(calledOnRequest);
        // Act
        await getAxiosInstance().get('/example-route');
        // Assert
        expect(currentContext).toMatchObject({ requestId: expect.any(String) });
    });
});
function getAxiosInstance() {
    return axios_1.default.create({
        baseURL: 'http://localhost:3001',
        validateStatus: () => true,
    });
}
