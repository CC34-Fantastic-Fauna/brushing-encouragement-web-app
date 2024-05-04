const {expect} = require('chai');
const crypto = require ('crypto');
const { generateSalt, generateHashedPassword } = require('../../utils/authentication/password-hasher');


describe('Generating a hashed password', () => {
  const salt = generateSalt();
  const plainPassword = 'HelloWorld'

  describe('generateSalt', () => {
    it('should return a string', () => {
      expect(generateSalt()).to.be.a('string');
    })
  })

  describe('generateHashedPassword', () => {
    it ('should return a string', () => {
      expect(generateHashedPassword(plainPassword)).to.be.a('string');
    })
    
    it ('should return the same hashed string if the salt and plain text password are the same', () => {
      const expectedPlainPassword = plainPassword;
      const expectedHashedPassword = generateHashedPassword(expectedPlainPassword, salt);
      expect(generateHashedPassword(plainPassword, salt)).to.equal(expectedHashedPassword);
    })

    it ('should return a different string if salt is different', () => {
      const tempSalt = crypto.randomBytes(6).toString('hex');
      const diffHashedPassword = generateHashedPassword(plainPassword, tempSalt);
      expect(generateHashedPassword(plainPassword, salt)).to.not.equal(diffHashedPassword);
    })

  })
})
