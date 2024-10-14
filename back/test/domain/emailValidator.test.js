const { emailValidator } = require("../../auth/domain/emailValidator");

describe("emailValidator", () => {
  describe("validating email", () => {
    test("should return valid when email is correctly formatted", () => {
      const email = "test@example.com";
      const result = emailValidator(email);

      expect(result).toEqual({
        emailValidation: true,
        emailMessage: "[INFO] Email is valid",
      });
    });

    test("should return error when email is not provided", () => {
      const email = null; 
      const result = emailValidator(email);

      expect(result).toEqual({
        emailValidation: false,
        emailMessage: "[ERROR] email is required",
      });
    });

    test("should return error when email structure is invalid", () => {
      const email = "invalid-email";  
      const result = emailValidator(email);

      expect(result).toEqual({
        emailValidation: false,
        emailMessage: "[ERROR] email structure is not valid.",
      });
    });

    test("should return error when email has spaces", () => {
      const email = "user @example.com"; 
      const result = emailValidator(email);

      expect(result).toEqual({
        emailValidation: false,
        emailMessage: "[ERROR] email structure is not valid.",
      });
    });
  });
});
