const { validationTweetStructure } = require('../../../tweets/domain/tweetsValidators');

describe('validationTweetStructure', () => {

  describe('Validating tweet content', () => {

    test('should return validation error for empty content', () => {
      const result = validationTweetStructure("");
      expect(result).toEqual({
        validation: false,
        message: "[ERROR] The tweet content is empty"
      });
    });

    test('should return validation error for content with only spaces', () => {
      const result = validationTweetStructure("   ");
      expect(result).toEqual({
        validation: false,
        message: "[ERROR] The tweet content is empty"
      });
    });

    test('should return validation error for content length less than 1', () => {
      const result = validationTweetStructure("a")
      expect(result).toEqual({
        validation: true,
        message: ""
      });
    });

    test('should return validation error for content length greater than 280', () => {
      const longContent = 'a'.repeat(281);
      const result = validationTweetStructure(longContent);
      expect(result).toEqual({
        validation: false,
        message: "[ERROR] The tweet content must be between 1 and 280 characters"
      });
    });

    test('should return validation success for valid content', () => {
      const validContent = "This is a valid tweet!";
      const result = validationTweetStructure(validContent);
      expect(result).toEqual({
        validation: true,
        message: ""
      });
    });
  });
});
