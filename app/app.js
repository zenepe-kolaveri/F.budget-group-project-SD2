// Import express.js
const express = require("express");
// Create a new express application 
var app = express();
// Add static files location, adds a middleware for serving static files to your Express app.
app.use(express.static("static"));  // middleware  
app.set("view engine", "pug"); // // Set up template engine 
// Set the view directory of the app 
app.set("views", "./app/views");
// Get the functions in the db.js file to use
const db = require('./services/db');
// Get the models
const { User } = require("./models/user");

// Task 1 Single user expenses 
app.get("/expenses/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    // Create a user class with the user_id passed
    var user = new User(user_id);
    await user.getuserExpenses();
    console.log(user);
    res.render('expenses', { user: user });
});

// Create a route for testing the db
app.get("/users", function (req, res) {
    // Prepare an SQL query that will return all rows from the test_table
    var sql = 'select * from budget_user';
    // Use the db.query() function from services/db.js to send our query
    // We need the result to proceed, but
    // we are not inside an async function we cannot use await keyword here.
    // So we use a .then() block to ensure that we wait until the
    // promise returned by the async function is resolved before we proceed
    db.query(sql).then(results => {
        // Take a peek in the console
        console.log(results);
        // Send to the web pate
        res.json(results)
    });
});

// Start server on port 3000
app.listen(3000, function () {
    console.log(`Server running at http://127.0.0.1:3000/`);
});