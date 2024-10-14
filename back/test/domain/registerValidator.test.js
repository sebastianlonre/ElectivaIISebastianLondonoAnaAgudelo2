const { registerValidator } = require("../../auth/domain/registerValidator");

describe("registerValidator with provided data", () => {
  test("should return error when userTag contains an invalid character (@)", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "user",
      userTag: "@UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user tag can only contain letters, numbers, ., _, or -",
    });
  });

  test("should return valid when all fields are valid", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "user",
      userTag: "UserPrototypeTag", 
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: true,
      registerMessage: "[INFO] User registration data is valid",
    });
  });

  test("should return error when userName is missing", () => {
    const userData = {
      userName: "",
      userLastName: "user",
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user name is required",
    });
  });

  test("should return error when userLastName is missing", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "",
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user last name is required",
    });
  });

  test("should return error when userTag is missing", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "user",
      userTag: "",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user tag is required",
    });
  });

  test("should return error when userName exceeds 45 characters", () => {
    const userData = {
      userName: "a".repeat(46),
      userLastName: "user",
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user name must be between 1 and 45 characters",
    });
  });

  test("should return error when userLastName exceeds 45 characters", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "b".repeat(46),
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user last name must be between 1 and 45 characters",
    });
  });

  test("should return error when userTag is less than 5 characters", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "user",
      userTag: "Tag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user last name must be between 5 and 30 characters",
    });
  });

  test("should return error when userTag exceeds 30 characters", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "user",
      userTag: "a".repeat(31),
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user last name must be between 5 and 30 characters",
    });
  });

  test("should return error when userName contains special characters", () => {
    const userData = {
      userName: "Pro@totype",
      userLastName: "user",
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user name must not contain special characters",
    });
  });

  test("should return error when userLastName contains special characters", () => {
    const userData = {
      userName: "Prototype",
      userLastName: "us@er",
      userTag: "UserPrototypeTag",
    };
    const result = registerValidator(userData);

    expect(result).toEqual({
      registerValidation: false,
      registerMessage: "[ERROR] user last name must not contain special characters",
    });
  });
});
