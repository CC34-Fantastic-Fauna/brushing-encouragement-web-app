const express = require('express');
const cors = require('cors');
const session = require ('express-session');

const loginRoutes = require("./routes/login");

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'brush secret',
  cookie: { maxAge: 30000},
  saveUninitialized: false,
}));





const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Brush Buddy"});
  })

  app.use("/login", loginRoutes);
  
  return app;
}

module.exports = { setupServer };