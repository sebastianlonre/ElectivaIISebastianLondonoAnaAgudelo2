const loginUser = require("../../auth//aplication/loginUser"); 
const User = require("../../users/domain/userModel");
const { generateToken } = require("../../auth/aplication/generateJWT");
const { validateDataForLogin } = require("../../auth/aplication/validateDataForLogin");

jest.mock("../../users/domain/userModel");
jest.mock("../../auth/aplication/generateJWT");
jest.mock("../../auth/aplication/validateDataForLogin");

describe("loginUser", () => {
  const mockUserData = {
    userTag: "@UserPrototype",
    password: "CurrentPassword.1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return error if validation fails", async () => {
    const validationError = { menssage_error: "[ERROR] Validation error" };
    validateDataForLogin.mockReturnValueOnce(validationError);

    const result = await loginUser(mockUserData);

    expect(result).toEqual(validationError);
    expect(validateDataForLogin).toHaveBeenCalledWith(mockUserData);
  });

  test("should return error if user does not exist", async () => {
    validateDataForLogin.mockReturnValueOnce(null);
    User.findOne.mockResolvedValueOnce(null);

    const result = await loginUser(mockUserData);

    expect(result).toEqual({ message_error: "[ERROR] The user does not exist" });
    expect(User.findOne).toHaveBeenCalledWith({ userTag: mockUserData.userTag });
  });

  test("should return error if password is incorrect", async () => {
    const mockUser = { password: "WrongPassword" };
    validateDataForLogin.mockReturnValueOnce(null);
    User.findOne.mockResolvedValueOnce(mockUser);

    const result = await loginUser(mockUserData);

    expect(result).toEqual({ message_error: "[ERROR] Incorrect password" });
  });

  test("should return success message and token if login is successful", async () => {
    const mockUser = { password: mockUserData.password };
    validateDataForLogin.mockReturnValueOnce(null);
    User.findOne.mockResolvedValueOnce(mockUser);
    generateToken.mockReturnValueOnce("mockToken");

    const result = await loginUser(mockUserData);

    expect(result).toEqual({ message: "[INFO] Login successful", token: "mockToken" });
    expect(generateToken).toHaveBeenCalledWith({ userData: mockUserData });
  });

  test("should return error if an exception occurs", async () => {
    const validationError = new Error("Database connection failed");
    validateDataForLogin.mockReturnValueOnce(null);
    User.findOne.mockRejectedValueOnce(validationError);

    const result = await loginUser(mockUserData);

    expect(result).toEqual({ message_error: "[ERROR] Login failed: Database connection failed" });
  });
});
