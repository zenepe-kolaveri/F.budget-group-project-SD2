// Import express.js
const express = require("express");
// Create a new express application 
var app = express();
// Add static files location, adds a middleware for serving static files to your Express app.
//app.use(express.static("static"));  // middleware  
app.use('/static', express.static('static'))
app.set("view engine", "pug"); // // Set up template engine 
// Set the view directory of the app 
app.set("views", "./app/views");
// Get the functions in the db.js file to use
const db = require('./services/db');
// Get the models
const {User} = require("./models/user");



app.use(express.urlencoded({ extended: true }));


// Task Single user income 
app.get("/income/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserIncome();
    console.log(user);
    res.render('income', { user: user });
});

// Task Single user expenses 
app.get("/expenses/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserExpenses();
    console.log(user);
    res.render('expenses', { user: user });
});


app.get("/report/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserReport();
    console.log(user);
    res.render('report', { user: user });
});

//for homepage
app.get("/home/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserReport();
    console.log(user);
    res.render('home', { user: user });

});

app.post('/add-expenses', function (req, res) {
    // Adding a try/catch block which will be useful later when we add to the database
    params = req.body;
    console.log(params)
    // Note that we need the id to get update the correct student
    var user = new User(params.id)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        user.addExpenses(params.description, params.category, params.amount_GBP, params.expense_date, params.id).then(result => {
            // Just a little output for now
            res.send('form submitted');
        })
     } catch (err) {
         console.error(`Error while adding note `, err.message);
     }
});

app.get("/alluser", async function (req, res) {
    let allusers = [1,2,3,4]

    res.render('userpage', { allusers: allusers });
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