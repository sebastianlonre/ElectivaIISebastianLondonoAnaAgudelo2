const registerUser = require("../../auth//aplication/registerUser"); 
const User = require("../../users/domain/userModel");
const { generateToken } = require("../../auth/aplication/generateJWT");
const { validateDataForRegister } = require("../../auth/aplication/validateDataForRegister");

jest.mock("../../users/domain/userModel");
jest.mock("../../auth/aplication/generateJWT");
jest.mock("../../auth/aplication/validateDataForRegister");

describe("registerUser", () => {
  const userData = {
    userName: "Prototype4",
    userLastName: "user4",
    userTag: "UserPrototypeTag4",
    email: "admin4@admin.com",
    password: "CurrentPassword.4"
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user successfully", async () => {
    validateDataForRegister.mockReturnValue(null); 
    User.findOne.mockResolvedValue(null); 

    const token = "mockToken";
    generateToken.mockReturnValue(token);

    const result = await registerUser(userData);

    expect(result).toEqual({
      message: "[INFO] User registered successfully",
      token
    });
    expect(User.prototype.save).toHaveBeenCalled(); 
  });

  test("should return an error if validation fails", async () => {
    const validationError = { menssage_error: "[ERROR] Invalid data" };
    validateDataForRegister.mockReturnValue(validationError);

    const result = await registerUser(userData);

    expect(result).toEqual({
      message_error: validationError.menssage_error
    });
    expect(User.findOne).not.toHaveBeenCalled(); 
  });

  test("should return an error if the user already exists", async () => {
    validateDataForRegister.mockReturnValue(null); 
    User.findOne.mockResolvedValue({}); 

    const result = await registerUser(userData);

    expect(result).toEqual({
      message_error: "[ERROR] the user already exists"
    });
    expect(User.prototype.save).not.toHaveBeenCalled(); 
  });

  test("should return an error if an exception occurs during registration", async () => {
    validateDataForRegister.mockReturnValue(null);
    User.findOne.mockResolvedValue(null); 
    User.prototype.save.mockImplementation(() => {
      throw new Error("Database error"); 
    });

    const result = await registerUser(userData);

    expect(result).toEqual({
      message_error: "[ERROR] to register user: Error: Database error"
    });
  });
});
