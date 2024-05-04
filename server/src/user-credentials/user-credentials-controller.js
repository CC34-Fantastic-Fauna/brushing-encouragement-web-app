const userCredentialModel = require('./user-credentials-model');

async function createUserCredential (req, res) {
  // console.log(req.sessionID);
  const { userEmail, password } = req.body;
  if (req.session.authenticated) {
    res.json(req.session);
  } else { //User has not been previously authenticated
    if (password == "brushingisfun") { //check the user's password
      req.session.authenticated = true;
      req.session.user = {
        userEmail, password
      }
      res.json(req.session);
    } else { // Bad password
      res.status(403).send({message: "Bad credentials"});
    }
  }
  
  // res.status(200).send({message: "Successfully logged in."});  
}

async function getUserCredential (req, res) {
  const { userEmail } = req.body;
  console.log(userEmail);
  const result = await userCredentialModel.getByEmail(userEmail);
  return result;
}

async function handleUserCredential(req, res) {
  const user = await getUserCredential(req, res);
  if (!user) return res.status(400).send({message: "User not found. Let's make an account."});

  const { userEmail, password } = req.body;
  if (req.session.authenticated) {
    res.json(req.session);
  } else { //User has not been previously authenticated
    if (password == "brushingisfun") { //check the user's password
      req.session.authenticated = true;
      req.session.user = {
        userEmail, password
      }
      res.json(req.session);
    } else { // Bad password
      res.status(403).send({message: "Bad credentials"});
    }
  }
}

module.exports = {
  createUserCredential,
  getUserCredential,
  handleUserCredential,
}