const { validateDataForRegister } = require("../../auth/aplication/validateDataForRegister");
const { emailValidator } = require("../../auth/domain/emailValidator");
const { passwordValidator } = require("../../auth/domain/passwordValidator");
const { registerValidator } = require("../../auth/domain/registerValidator");

jest.mock("../../auth/domain/emailValidator");
jest.mock("../../auth/domain/passwordValidator");
jest.mock("../../auth/domain/registerValidator");

describe("validateDataForRegister", () => {
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

  test("should return an error if password is invalid", () => {
    const passwordMessage = "[ERROR] Invalid password";
    passwordValidator.mockReturnValue({ passwordValidation: false, passwordMessage });
    
    const result = validateDataForRegister(userData);

    expect(result).toEqual({ menssage_error: passwordMessage });
  });

  test("should return an error if registration data is invalid", () => {
    const registerMessage = "[ERROR] Invalid registration data";
    registerValidator.mockReturnValue({ registerValidation: false, registerMessage });
    passwordValidator.mockReturnValue({ passwordValidation: true }); // Simula que la contraseña es válida

    const result = validateDataForRegister(userData);

    expect(result).toEqual({ menssage_error: registerMessage });
  });

  test("should return an error if email is invalid", () => {
    const emailMessage = "[ERROR] Invalid email";
    emailValidator.mockReturnValue({ emailValidation: false, emailMessage });
    passwordValidator.mockReturnValue({ passwordValidation: true }); // Simula que la contraseña es válida
    registerValidator.mockReturnValue({ registerValidation: true }); // Simula que los datos de registro son válidos

    const result = validateDataForRegister(userData);

    expect(result).toEqual({ menssage_error: emailMessage });
  });

  test("should return undefined if all validations pass", () => {
    passwordValidator.mockReturnValue({ passwordValidation: true });
    registerValidator.mockReturnValue({ registerValidation: true });
    emailValidator.mockReturnValue({ emailValidation: true });

    const result = validateDataForRegister(userData);

    expect(result).toBeUndefined();
  });
});
