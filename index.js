// require your server and launc

const server = require('./api/server')
const port = 9000;



// Start the server on the specified port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});