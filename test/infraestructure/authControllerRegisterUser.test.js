const httpMocks = require("node-mocks-http");
const authController = require("../../auth/infraestructure/authController");
const registerUser = require("../../auth/aplication/registerUser");
const { loginUser } = require("../../auth/aplication/loginUser");

jest.mock("../../auth/aplication/registerUser");
jest.mock("../../auth/aplication/loginUser");

describe("authController.js", () => {
  describe("Register User", () => {
    describe("with valid fields", () => {
      test("should return User is registered successfully", async () => {
        console.log("Iniciando la prueba...");

        const mockUserRegister = {
          userName: "Prototype",
          userLastName: "user",
          userTag: "@UserPrototypeTag",
          email: "admin@admin.com",
          password: "CurrentPassword.1",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/register",
          body: mockUserRegister,
        });
        const response = httpMocks.createResponse();

        console.log("Antes de hacer el mock de registerUser");

        registerUser.mockResolvedValue({
          message: "[INFO] User registered successfully",
          token: "test_token",
        });

        console.log("Antes de llamar a authController");

        await authController.registerUserItem(request, response);

        console.log("Después de llamar a authController");

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual({
          message: "[INFO] User registered successfully",
          token: "test_token",
        });
      }, 10000);

      test("should return 400 when user data is invalid", async () => {
        const mockInvalidUserRegister = {
          userName: "",
          userLastName: "user",
          userTag: "@UserPrototypeTag",
          email: "invalid-email",
          password: "short",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/register",
          body: mockInvalidUserRegister,
        });
        const response = httpMocks.createResponse();

        registerUser.mockResolvedValue({
          message_error: "[ERROR] Invalid user data",
        });

        await authController.registerUserItem(request, response);

        expect(response.statusCode).toBe(400);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Invalid user data",
        });
      }, 10000);

      test("should return 500 on server error", async () => {
        const mockUserRegister = {
          userName: "Prototype",
          userLastName: "user",
          userTag: "@UserPrototypeTag",
          email: "admin@admin.com",
          password: "CurrentPassword.1",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/register",
          body: mockUserRegister,
        });
        const response = httpMocks.createResponse();

        registerUser.mockRejectedValue(new Error("Server error"));

        await authController.registerUserItem(request, response);

        expect(response.statusCode).toBe(500);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Unexpected server error: Error: Server error",
        });
      }, 10000);
    });
  });
});

//LOGIN
describe("authController.js", () => {
  describe("Login User", () => {
    describe("with valid fields", () => {
      test("should return User is login successfully", async () => {
        console.log("Iniciando la prueba...");

        const mockUserLoginOk = {
          userTag: "@UserPrototypeTag",
          password: "CurrentPassword.1",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/login",
          body: mockUserLoginOk,
        });
        const response = httpMocks.createResponse();

        console.log("Antes de hacer el mock de registerUser");

        loginUser.mockResolvedValue({
          message: "[INFO] User registered successfully",
          token: "test_token",
        });

        console.log("Antes de llamar a authController");

        await authController.loginUserItem(request, response);

        console.log("Después de llamar a authController");

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual({
          message: "[INFO] User registered successfully",
          token: "test_token",
        });
      }, 10000);

      test("should return 400 when user data is invalid", async () => {
        const mockInvalidUserlogin = {
          userTag: "@UserPrototypeTag",
          password: "WrongPassword",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/login",
          body: mockInvalidUserlogin,
        });
        const response = httpMocks.createResponse();

        loginUser.mockResolvedValue({
          message_error: "[ERROR] Invalid user data",
        });

        await authController.loginUserItem(request, response);

        expect(response.statusCode).toBe(400);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Invalid user data",
        });
      }, 10000);

      test("should return 500 on server error", async () => {
        const mockUserLogin = {
          userTag: "@UserPrototypeTag",
          password: "CurrentPassword.1",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/login",
          body: mockUserLogin,
        });
        const response = httpMocks.createResponse();

        loginUser.mockRejectedValue(new Error("Server error"));

        await authController.loginUserItem(request, response);

        expect(response.statusCode).toBe(500);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Unexpected server error: Error: Server error",
        });
      }, 10000);
    });
  });

  // LOGOUT
  describe("authController.js", () => {
    describe("Logout User", () => {
      test("should return 200 on successful logout", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url: "/logout",
        });
        const response = httpMocks.createResponse();

        request.session = {
          destroy: jest.fn((callback) => callback(null)),
        };

        await authController.logoutUserItem(request, response);

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual({
          message: "[INFO] Logout successful",
        });
      }, 10000);

      test("should return 500 on logout error", async () => {
        const request = httpMocks.createRequest({
          method: "POST",
          url: "/logout",
        });
        const response = httpMocks.createResponse();

        request.session = {
          destroy: jest.fn((callback) => callback(new Error("Logout error"))),
        };

        await authController.logoutUserItem(request, response);

        expect(response.statusCode).toBe(500);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Could not log out",
        });
      }, 10000);
    });
  });
});
