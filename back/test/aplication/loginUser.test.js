const { generateToken } = require("../../auth/aplication/generateJWT");
const { loginUser } = require("../../auth/aplication/loginUser");
const { validateDataForLogin } = require("../../auth/aplication/validateDataForLogin");
const { findUser } = require("../../users/infraestructure/userAdapters");

jest.mock("../../users/infraestructure/userAdapters");
jest.mock("../../auth/aplication/validateDataForLogin");
jest.mock("../../auth/aplication/generateJWT");

const mockUserData = { userTag: "@UserPrototype", password: "password123" };

describe('loginUser', () => {
  describe('Validating user login', () => {
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
      findUser.mockResolvedValue(null);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] The user does not exist",
      });
    });

    test('should return error message if password is incorrect', async () => {
      const mockUser = { user: { userTag: mockUserData.userTag, password: "wrongPassword", userName: "John", userLastName: "Doe" } };
      validateDataForLogin.mockReturnValue(null);
      findUser.mockResolvedValue(mockUser);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] Incorrect password",
      });
    });

    test('should return success message and user info if login is successful', async () => {
      const mockUser = { user: { userTag: mockUserData.userTag, password: mockUserData.password, userName: "John", userLastName: "Doe" } };
      const mockToken = "mockToken123";

      validateDataForLogin.mockReturnValue(null);
      findUser.mockResolvedValue(mockUser);
      generateToken.mockReturnValue(mockToken);

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message: "[INFO] Login successful",
        userInfo: {
          userName: "John",
          userLastName: "Doe",
          token: mockToken,
        },
      });
    });

    test('should return error message on unexpected error', async () => {
      const mockError = new Error("[ERROR] Unexpected error");
      validateDataForLogin.mockReturnValue(null);
      findUser.mockImplementation(() => {
        throw mockError;
      });

      const result = await loginUser(mockUserData);

      expect(result).toEqual({
        message_error: "[ERROR] Login failed: " + mockError,
      });
    });
  });
});
