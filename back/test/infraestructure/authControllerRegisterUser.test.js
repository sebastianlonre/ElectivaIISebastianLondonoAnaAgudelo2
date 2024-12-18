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

        registerUser.mockResolvedValue({
          message: "[INFO] User registered successfully",
          token: "test_token",
        });

        await authController.registerUserItem(request, response);

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

  // LOGIN
  describe("Login User", () => {
    describe("with valid fields", () => {
      test("should return User is logged in successfully", async () => {
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

        loginUser.mockResolvedValueOnce({
          message: "[INFO] User logged in successfully",
          userInfo: {
            userName: "Prototype",
            userLastName: "user",
            token: "test_token",
          },
        });

        await authController.loginUserItem(request, response);

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toEqual({
          message: "[INFO] User logged in successfully",
          token: "test_token",
        });
      });


      test("should return 400 when user data is invalid", async () => {
        const mockInvalidUserLogin = {
          userTag: "@UserPrototypeTag",
          password: "WrongPassword",
        };

        const request = httpMocks.createRequest({
          method: "POST",
          url: "/login",
          body: mockInvalidUserLogin,
          session: {},
        });
        const response = httpMocks.createResponse();

        loginUser.mockResolvedValue({
          message_error: "[ERROR] Invalid user data",
        });

        await authController.loginUserItem(request, response);
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
          session: {},
        });
        const response = httpMocks.createResponse();

        loginUser.mockRejectedValue(new Error("Server error"));

        await authController.loginUserItem(request, response);

        expect(response.statusCode).toBe(500);
        expect(response._getJSONData()).toEqual({
          message_error: "[ERROR] Unexpected server error: Error: Server error",
          ok: false,
        });
      }, 10000);
    });
  });

  // LOGOUT
  describe("Logout User", () => {
    test("should return 200 on successful logout", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/logout",
      });
      const response = httpMocks.createResponse();

      request.session = {
        user: {
          userTag: "@UserPrototypeTag",
        },
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
        user: {
          userTag: "@UserPrototypeTag",
        },
        destroy: jest.fn((callback) => callback(new Error("Logout error"))),
      };

      await authController.logoutUserItem(request, response);

      expect(response.statusCode).toBe(500);
      expect(response._getJSONData()).toEqual({
        message_error: "[ERROR] Could not log outError: Logout error",
      });
    }, 10000);
  });
});
