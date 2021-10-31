
require('dotenv').config()
const http = require ('http');


//set up express
const app = require('./app');


//server setup
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`) );