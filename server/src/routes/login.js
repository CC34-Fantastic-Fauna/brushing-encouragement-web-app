const { Router } = require('express');
const {validateEmail} = require('./../utils/authentication/validate-email');
const userCredentialController = require('./../user-credentials/user-credentials-controller');

const router = Router();

function isValidEmail (req, res, next) {
  const {user_email} = req.body;
  if (!validateEmail(user_email)) return res.status(400).send({message: "Not valid email"});
  
  next();
}

router.get('/', (req,res) => {
  res.status(200).send({message: "Login endpoint"});
})

router.post("/", isValidEmail, userCredentialController.handleUserCredential);

function isAuthenticated (req, res, next) {
  if (!req.session.authenticated) return res.status(403).send({message: "Not authenticated"});

  next();
}

router.get("/test", isValidEmail, isAuthenticated, (req, res) => {
  res.status(200).send({message: "Authenticated"})
});

module.exports = router;