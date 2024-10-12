const { loginValidator } = require("../../auth/domain/loginValidator");

describe("loginValidator", () => {
  describe("validating user login data", () => {
    test("should return valid message for valid user data", () => {
      const validUserData = {
        userTag: "@UserPrototypeTag",
        password: "CurrentPassword.1",
      };

      const result = loginValidator(validUserData);

      expect(result.loginValidation).toBe(true);
      expect(result.loginMessage).toBe("[INFO] Login data is valid");
    });

    test("should return error message when userTag is missing", () => {
      const invalidUserData = {
        userTag: "",
        password: "CurrentPassword.1",
      };

      const result = loginValidator(invalidUserData);

      expect(result.loginValidation).toBe(false);
      expect(result.loginMessage).toBe("[ERROR] UserTag is required");
    });

    test("should return error message when password is missing", () => {
      const invalidUserData = {
        userTag: "@UserPrototypeTag",
        password: "",
      };

      const result = loginValidator(invalidUserData);

      expect(result.loginValidation).toBe(false);
      expect(result.loginMessage).toBe("[ERROR] Password is required");
    });

    test("should return error message when both userTag and password are missing", () => {
      const invalidUserData = {
        userTag: "",
        password: "",
      };

      const result = loginValidator(invalidUserData);

      expect(result.loginValidation).toBe(false);
      expect(result.loginMessage).toBe("[ERROR] UserTag is required");
    });
  });
});
