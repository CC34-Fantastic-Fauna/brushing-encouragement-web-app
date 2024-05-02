const express = require('express');
const cors = require('cors');
const app = express();

const PORT = parseInt(process.env.PORT) || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})