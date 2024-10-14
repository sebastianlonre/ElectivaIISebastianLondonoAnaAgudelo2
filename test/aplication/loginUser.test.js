const { generateToken } = require("../../auth/aplication/generateJWT");
const { loginUser } = require("../../auth/aplication/loginUser");
const { validateDataForLogin } = require("../../auth/aplication/validateDataForLogin");
const User = require("../../users/domain/userModel");

jest.mock("../../users/domain/userModel");
jest.mock("../../auth/aplication/validateDataForLogin");
jest.mock("../../auth/aplication/generateJWT");

describe('loginUser', () => {
  describe('Validating user login', () => {
    const mockUserData = { userTag: "@UserPrototype", password: "password123" };

    test('should return error message if validation fails', async () => {
      const mockValidationError = { menssage_error: "[ERROR] Invalid data" };
      validateDataForLogin.mockReturnValue(mockValidationError);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: mockValidationError.menssage_error,
      });
    });

    test('should return error message if user does not exist', async () => {
      validateDataForLogin.mockReturnValue(null);
      User.findOne.mockResolvedValue(null);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] The user does not exist",
      });
    });

    test('should return error message if password is incorrect', async () => {
      const mockUser = { userTag: mockUserData.userTag, password: "wrongPassword" };
      validateDataForLogin.mockReturnValue(null);
      User.findOne.mockResolvedValue(mockUser);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] Incorrect password",
      });
    });

    test('should return success message and token if login is successful', async () => {
      const mockUser = { userTag: mockUserData.userTag, password: mockUserData.password };
      const mockToken = "mockToken123";

      validateDataForLogin.mockReturnValue(null);
      User.findOne.mockResolvedValue(mockUser);
      generateToken.mockReturnValue(mockToken);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message: "[INFO] Login successful",
        token: mockToken,
      });
    });

    test('should return error message on unexpected error', async () => {
      const mockError = new Error("[ERROR] Unexpected error");
      validateDataForLogin.mockReturnValue(null);
      User.findOne.mockImplementation(() => {
        throw mockError;
      });

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] Login failed: " + mockError,
      });
    });
  });
});
