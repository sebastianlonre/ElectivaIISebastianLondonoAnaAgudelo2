const { socialValidator } = require("../../../social/domain/socialValidator");

describe('socialValidator', () => {

  describe('Validation of user tags', () => {

    test('should return validation false if userTag is not provided', () => {
      const result = socialValidator(null, "@FollowedUserTag");

      expect(result).toEqual({
        validation: false,
        menssage: "user tag is require",
      });
    });

    test('should return validation false if userToFollowTag is not provided', () => {
      const result = socialValidator("@UserPrototypeTag", null);

      expect(result).toEqual({
        validation: false,
        menssage: "user tag to follow is require",
      });
    });

    test('should return validation true if both userTag and userToFollowTag are provided', () => {
      const result = socialValidator("@UserPrototypeTag", "@FollowedUserTag");

      expect(result).toEqual({
        validation: true,
        menssage: "",
      });
    });
  });
});
