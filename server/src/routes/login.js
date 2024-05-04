const { Router } = require('express');
const {validateEmail} = require('./../utils/authentication/validate-email');
const userCredentialController = require('./../user-credentials/user-credentials-controller');

const router = Router();

function isValidEmail (req, res, next) {
  const body = req.body;
  if (!validateEmail(body.userEmail)) return res.status(400).send({message: "Not valid email"});
  
  next();
}

router.get('/', (req,res) => {
  res.status(200).send({message: "Login endpoint"});
})

router.post("/", isValidEmail, userCredentialController.handleUserCredential);

module.exports = router;