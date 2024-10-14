const { loginValidator } = require("../../auth/domain/loginValidator");
const { validateDataForLogin } = require("../../auth/aplication/validateDataForLogin");
const { userTagValidator } = require("../../auth/domain/userTagValidator");
const { passwordValidator } = require("../../auth/domain/passwordValidator");

jest.mock("../../auth/domain/userTagValidator");
jest.mock("../../auth/domain/passwordValidator");
jest.mock("../../auth/domain/loginValidator");

describe('validateDataForLogin', () => {
  const mockUserData = { userTag: "@UserPrototype", password: "password123" };


  test('should return error message if password is invalid', () => {
    const mockPasswordError = { passwordValidation: false, passwordMessage: "[ERROR] Invalid password" };

    passwordValidator.mockReturnValue(mockPasswordError);
    loginValidator.mockReturnValue({ loginValidation: true, loginMessage: "" });
    userTagValidator.mockReturnValue({ userTagValidation: true, userTagMessage: "" });

    const result = validateDataForLogin(mockUserData);

    expect(result).toEqual({ menssage_error: mockPasswordError.passwordMessage });
  });

  test('should return error message if login validation fails', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    const mockLoginError = { loginValidation: false, loginMessage: "[ERROR] Invalid login" };
    loginValidator.mockReturnValue(mockLoginError);
    userTagValidator.mockReturnValue({ userTagValidation: true, userTagMessage: "" });

    const result = validateDataForLogin(mockUserData);

    expect(result).toEqual({ menssage_error: mockLoginError.loginMessage });
  });

  test('should return error message if userTag is invalid', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    loginValidator.mockReturnValue({ loginValidation: true, loginMessage: "" });
    const mockUserTagError = { userTagValidation: false, userTagMessage: "[ERROR] Invalid userTag" };
    userTagValidator.mockReturnValue(mockUserTagError);

    const result = validateDataForLogin(mockUserData);

    expect(result).toEqual({ menssage_error: mockUserTagError.userTagMessage });
  });

  test('should return undefined if all validations pass', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    const mockLoginValidation = { loginValidation: true, loginMessage: "" };
    loginValidator.mockReturnValue(mockLoginValidation);
    const mockUserTagValidation = { userTagValidation: true, userTagMessage: "" };
    userTagValidator.mockReturnValue(mockUserTagValidation);

    const result = validateDataForLogin(mockUserData);

    expect(result).toBeUndefined();
  });
});
