const jwt = require("jsonwebtoken");
const { generateToken } = require("../../auth/aplication/generateJWT");

jest.mock("jsonwebtoken");

describe("generateToken with provided payload", () => {
  const payload = { userId: "12345", userTag: "@UserPrototype" };
  const mockSecret = "mockSecret";

  beforeAll(() => {
    process.env.JWT_SECRET = mockSecret;
  });

  test("should generate a token with the correct payload and secret", () => {
    const mockToken = "mockGeneratedToken";
    jwt.sign.mockReturnValue(mockToken);

    const token = generateToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, mockSecret, { expiresIn: "1h" });
    expect(token).toBe(mockToken);
  });

  test("should throw an error if JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET;

    expect(() => generateToken(payload)).toThrow();
  });

  test("should set token expiration to 1 hour", () => {
    const mockToken = "mockGeneratedToken";
    jwt.sign.mockReturnValue(mockToken);

    const token = generateToken(payload);

    expect(jwt.sign).toHaveBeenCalledWith(payload, mockSecret, { expiresIn: "1h" });
    expect(token).toBe(mockToken);
  });
});
