const { Router } = require('express');
const {validateEmail} = require('./../authentication/validate-email');
const userCredentialController = require('./../user-credentials/user-credentials-controller');

const router = Router();

function isValidEmail (req, res, next) {
  const {user_email} = req.body;
  if (!validateEmail(user_email)) return res.status(400).send({
    message: "Not valid email",
    isLoggedIn: false,
  });
  
  next();
}

router.get('/', (req,res) => {
  res.status(200).send({message: "Login endpoint"});
})

router.post('/', isValidEmail, userCredentialController.handleUserCredential);

module.exports = router;