// Import express
let express = require('express');

// Import body parser
let bodyParser = require('body-parser');
// Import Mongoose

let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable, timeout after 1 min of inactivity
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 60000});

var db = mongoose.connection;

// Check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 4000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon!'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app; // for testing
