const { validateDataForLogin } = require("../../auth/aplication/validateDataForLogin");
const { userTagValidator } = require("../../auth/domain/userTagValidator");
const { passwordValidator } = require("../../auth/domain/passwordValidator");
const { loginValidator } = require("../../auth/domain/loginValidator");

jest.mock("../../auth/domain/userTagValidator");
jest.mock("../../auth/domain/passwordValidator");
jest.mock("../../auth/domain/loginValidator");

describe("validateDataForLogin", () => {
  const userData = {
    userTag: "UserPrototype",
    password: "CurrentPassword"
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return an error if password is invalid", () => {
    const passwordMessage = "[ERROR] Invalid password";
    passwordValidator.mockReturnValue({ passwordValidation: false, passwordMessage });
    
    const result = validateDataForLogin(userData);

    expect(result).toEqual({ menssage_error: passwordMessage });
  });

  test("should return an error if login data is invalid", () => {
    const loginMessage = "[ERROR] Invalid login data";
    loginValidator.mockReturnValue({ loginValidation: false, loginMessage });
    passwordValidator.mockReturnValue({ passwordValidation: true }); // Simula que la contraseña es válida

    const result = validateDataForLogin(userData);

    expect(result).toEqual({ menssage_error: loginMessage });
  });

  test("should return an error if userTag is invalid", () => {
    const userTagMessage = "[ERROR] Invalid userTag";
    userTagValidator.mockReturnValue({ userTagValidation: false, userTagMessage });
    passwordValidator.mockReturnValue({ passwordValidation: true }); 
    loginValidator.mockReturnValue({ loginValidation: true }); 

    const result = validateDataForLogin(userData);

    expect(result).toEqual({ menssage_error: userTagMessage });
  });

  test("should return undefined if all validations pass", () => {
    passwordValidator.mockReturnValue({ passwordValidation: true });
    loginValidator.mockReturnValue({ loginValidation: true });
    userTagValidator.mockReturnValue({ userTagValidation: true });

    const result = validateDataForLogin(userData);

    expect(result).toBeUndefined();
  });
});
