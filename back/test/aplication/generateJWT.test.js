const jwt = require("jsonwebtoken");
const { generateToken } = require("../../auth/aplication/generateJWT");


jest.mock("jsonwebtoken");

describe('generateToken', () => {
  const mockPayload = { userData: { userTag: "@UserPrototype" } };
  const mockSecret = "mockSecret123";

  beforeAll(() => {
    process.env.JWT_SECRET = mockSecret;
  });

  test('should generate a token successfully', () => {
    const mockToken = "mockToken123";
    jwt.sign.mockReturnValue(mockToken);

    const result = generateToken(mockPayload);

    expect(result).toBe(mockToken);
  });

  test('should throw an error if token generation fails', () => {
    const mockError = new Error("[ERROR] Token generation failed");
    jwt.sign.mockImplementation(() => {
      throw mockError;
    });

    expect(() => generateToken(mockPayload)).toThrow("[ERROR] Token generation failed");
  });
});
