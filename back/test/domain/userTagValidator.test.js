const { userTagValidator } = require("../../auth/domain/userTagValidator");

describe("userTagValidator with provided data", () => {
  test("should return error when userTag is missing", () => {
    const userTag = "";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: false,
      userTagMessage: "[ERROR] userTag is required",
    });
  });

  test("should return error when userTag does not contain '@'", () => {
    const userTag = "UserPrototypeTag";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: false,
      userTagMessage: "[ERROR] userTag must contain an '@' symbol.",
    });
  });

  test("should return error when userTag contains invalid characters", () => {
    const userTag = "@UserPrototypeTag#";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: false,
      userTagMessage:
        "[ERROR] userTag must contain only alphanumeric characters, underscores, or '@'.",
    });
  });

  test("should return valid when userTag contains valid characters", () => {
    const userTag = "@User_Prototype";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: true,
      userTagMessage: "[INFO] userTag is valid",
    });
  });

  test("should return valid when userTag contains alphanumeric characters and '@'", () => {
    const userTag = "@UserPrototype123";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: true,
      userTagMessage: "[INFO] userTag is valid",
    });
  });

  test("should return error when userTag contains spaces", () => {
    const userTag = "@User Prototype";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: false,
      userTagMessage:
        "[ERROR] userTag must contain only alphanumeric characters, underscores, or '@'.",
    });
  });

  test("should return error when userTag contains special characters except '_'", () => {
    const userTag = "@User$Prototype!";
    const result = userTagValidator(userTag);

    expect(result).toEqual({
      userTagValidation: false,
      userTagMessage:
        "[ERROR] userTag must contain only alphanumeric characters, underscores, or '@'.",
    });
  });
});
