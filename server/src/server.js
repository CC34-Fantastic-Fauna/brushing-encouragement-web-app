const { setupServer } = require("./endpoints");

const server = setupServer();
const PORT = parseInt(process.env.PORT) || 8080;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})

