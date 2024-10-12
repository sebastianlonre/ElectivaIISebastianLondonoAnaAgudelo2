const { passwordValidator } = require("../../auth/domain/passwordValidator");

describe("passwordValidator", () => {
  describe("validating password", () => {
    test("should return valid when password meets all criteria", () => {
      const password = "ValidPass123.-";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: true,
        passwordMessage: "",
      });
    });

    test("should return error when password is not provided", () => {
      const password = null;  
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password is required",
      });
    });

    test("should return error when password is too short", () => {
      const password = "Short1.";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password must be between 8 and 30 characters",
      });
    });

    test("should return error when password is too long", () => {
      const password = "ThisPasswordIsWayTooLong1234567890.-";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password must be between 8 and 30 characters",
      });
    });

    test("should return error when password has no uppercase letter", () => {
      const password = "nouppercase123.-";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password must contain at least one uppercase letter",
      });
    });

    test("should return error when password contains invalid characters", () => {
      const password = "Invalid$Password123";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password contains invalid characters. Only ., _, and - are allowed.",
      });
    });

    test("should return error when password lacks special characters", () => {
      const password = "NoSpecialChar123";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password must contain at least one of the following characters: ., _, or -",
      });
    });

    test("should return error when password lacks numbers", () => {
      const password = "NoNumbersPass.-";
      const result = passwordValidator(password);

      expect(result).toEqual({
        passwordValidation: false,
        passwordMessage: "[ERROR] password must contain a number",
      });
    });
  });
});
