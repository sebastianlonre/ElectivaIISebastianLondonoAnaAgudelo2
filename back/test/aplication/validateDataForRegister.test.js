const { validateDataForRegister } = require("../../auth/aplication/validateDataForRegister");
const { emailValidator } = require("../../auth/domain/emailValidator");
const { passwordValidator } = require("../../auth/domain/passwordValidator");
const { registerValidator } = require("../../auth/domain/registerValidator");

jest.mock("../../auth/domain/emailValidator");
jest.mock("../../auth/domain/passwordValidator");
jest.mock("../../auth/domain/registerValidator");

describe('validateDataForRegister', () => {
  const mockUserData = { email: "user@example.com", password: "password123" };


  test('should return error message if password is invalid', () => {
    const mockPasswordError = { passwordValidation: false, passwordMessage: "[ERROR] Invalid password" };
    passwordValidator.mockReturnValue(mockPasswordError);
    registerValidator.mockReturnValue({ registerValidation: true, registerMessage: "" });
    emailValidator.mockReturnValue({ emailValidation: true, emailMessage: "" });

    const result = validateDataForRegister(mockUserData);

    expect(result).toEqual({ menssage_error: mockPasswordError.passwordMessage });
  });

  test('should return error message if registration validation fails', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    const mockRegisterError = { registerValidation: false, registerMessage: "[ERROR] Invalid registration data" };
    registerValidator.mockReturnValue(mockRegisterError);
    emailValidator.mockReturnValue({ emailValidation: true, emailMessage: "" });

    const result = validateDataForRegister(mockUserData);

    expect(result).toEqual({ menssage_error: mockRegisterError.registerMessage });
  });

  test('should return error message if email is invalid', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    registerValidator.mockReturnValue({ registerValidation: true, registerMessage: "" });
    const mockEmailError = { emailValidation: false, emailMessage: "[ERROR] Invalid email" };
    emailValidator.mockReturnValue(mockEmailError);

    const result = validateDataForRegister(mockUserData);

    expect(result).toEqual({ menssage_error: mockEmailError.emailMessage });
  });

  test('should return undefined if all validations pass', () => {
    const mockPasswordValidation = { passwordValidation: true, passwordMessage: "" };
    passwordValidator.mockReturnValue(mockPasswordValidation);
    const mockRegisterValidation = { registerValidation: true, registerMessage: "" };
    registerValidator.mockReturnValue(mockRegisterValidation);
    const mockEmailValidation = { emailValidation: true, emailMessage: "" };
    emailValidator.mockReturnValue(mockEmailValidation);

    const result = validateDataForRegister(mockUserData);

    expect(result).toBeUndefined();
  });
});
