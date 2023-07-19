// Use the dotenv package, to create environment variables
require('dotenv').config();
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
const PORT = process.env.PORT || 3000;
const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { apiRouter } = require('./api');
const { client } = require('./db');
// Import express, and create a server
// Require morgan and body-parser middleware
// Have the server use morgan with setting 'dev'
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use('/api', apiRouter);
// Import cors 
// Have the server use cors()
// Have the server use bodyParser.json()
// Have the server use your api router with prefix '/api'
// Import the client from your db/index.js
// Create custom 404 handler that sets the status code to 404.
server.use((err, res,req,next)=>{
    res.status(404).send({error: 'Not Found!' })
});
// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.use((err, res, req, next)=> {
    console.error(err);
    res.status(500).send({
        error: 'Internal server error'
    })
});

// Start the server listening on port PORT
// On success, connect to the database
server.listen(PORT, ()=> {
    console.log(`Server listening in port`, PORT)
    client.connect();

});
