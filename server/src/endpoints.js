const express = require('express');
const cors = require('cors');
const knex = require("./knex");
// const session = require ('express-session');
const cookieSession = require ('cookie-session');

const loginRoutes = require("./routes/login");

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN_URL,
  credentials: true,
}
));
app.use(cookieSession({
  secret: 'brush secret',
  maxAge: 30000,
  sameSite: 'lax',
  httpOnly: false,
}));

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to Brush Buddy"});
  })
  app.use("/login", loginRoutes);
  
  return app;
}

module.exports = { setupServer };