"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fastify_for_testing_1 = require("./fastify-for-testing");
const jwt_helper_1 = require("./jwt-helper");
describe('JWTVerifier plugin', () => {
    beforeAll(async () => {
        await (0, fastify_for_testing_1.startTestServer)(jwt_helper_1.exampleSecret);
    });
    afterAll(async () => {
        await (0, fastify_for_testing_1.stopTestServer)();
    });
    test('When not providing a token, then get back 401', async () => {
        // Arrange
        // Act
        const receivedResponse = await getAxiosInstance().get('/');
        // Assert
        expect(receivedResponse.status).toBe(401);
    });
    test('When providing a valid but expired token, then get back 401', async () => {
        // Arrange
        // Act
        const validToken = (0, jwt_helper_1.signExpiredToken)('joe', 'admin');
        const receivedResponse = await getAxiosInstance().get('/', {
            headers: { Authorization: validToken },
        });
        // Assert
        expect(receivedResponse.status).toBe(401);
    });
    test.each(['authorization', 'Authorization'])('When providing a valid token in the %s header, then get back 200', async (headerName) => {
        // Arrange
        const validToken = (0, jwt_helper_1.signValidTokenWithDefaultUser)();
        // Act
        const receivedResponse = await getAxiosInstance().get('/', {
            headers: { [headerName]: validToken },
        });
        // Assert
        expect(receivedResponse.status).toBe(200);
    });
    test('When providing an non-sense token, then get back 401', async () => {
        // Arrange
        // Act
        const receivedResponse = await getAxiosInstance().get('/', {
            headers: { Authorization: 'Bearer non-sense' },
        });
        // Assert
        expect(receivedResponse.status).toBe(401);
    });
});
function getAxiosInstance() {
    return axios_1.default.create({
        baseURL: 'http://localhost:3000',
        validateStatus: () => true,
    });
}
