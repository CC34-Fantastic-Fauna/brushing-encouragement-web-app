const { USER_CREDENTIALS_TABLE, SCORES_TABLE } = require("../../src/global/global");
const { generateHashedPassword, generateSalt } = require('../../src//utils/authentication/password-hasher')
const crypto = require('crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(SCORES_TABLE).del();
  await knex(USER_CREDENTIALS_TABLE).del();
  const brendaPasswordSalt = generateSalt();
  const brendaPlainTextPassword = "test";
  const brendaCredentialsEntry = {
    id: 1, 
    user_email: 'brenda@gmail.com', 
    salt: brendaPasswordSalt, 
    hashed_password: generateHashedPassword(brendaPlainTextPassword, brendaPasswordSalt)};

  await knex(USER_CREDENTIALS_TABLE).insert([
    brendaCredentialsEntry,
  ]);
  await knex.raw(`select setval(\'${USER_CREDENTIALS_TABLE}_id_seq\', max(id)) from ${USER_CREDENTIALS_TABLE}`);
};
