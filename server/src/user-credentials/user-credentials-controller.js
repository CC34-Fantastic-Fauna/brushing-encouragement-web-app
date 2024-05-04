const userCredentialModel = require('./user-credentials-model');
const { generateSalt, generateHashedPassword } = require('./../utils/authentication/password-hasher');

async function createUserCredential (req, res) {
  const { user_email, password } = req.body;
  const salt = generateSalt();
  const hashedPassword = generateHashedPassword(password, salt);
  const userCredentialObj = {
    user_email: user_email,
    hashed_password: hashedPassword,
    salt: salt,
  }
  try {
    const result = await userCredentialModel.create(userCredentialObj);
    res.status(201).json({message: "New user created."});
  } catch (err) {
    console.log(err);
  }
}

async function getUserCredential (req, res) {
  const { user_email } = req.body;
  const result = await userCredentialModel.getByEmail(user_email);
  return result;
}

async function handleUserCredential(req, res) {
  if (req.session.authenticated) {
    return res.json(req.session);
  }
  
  const { user_email, password } = req.body;
  const user = await getUserCredential(req, res);
  if (!user) return await createUserCredential(req, res);
  
  const { hashed_password, salt } = user;
  //User has not been previously authenticated
  if (generateHashedPassword(password, salt) === hashed_password) { //check the user's password
     req.session.authenticated = true;
     req.session.user = { //additional things to add to send back
      user_email, password
     }
     res.json(req.session);
   } else { // Bad password
     res.status(403).send({message: "Bad credentials"});
   }
}

module.exports = {
  createUserCredential,
  getUserCredential,
  handleUserCredential,
}