// Import express.js
const express = require("express");
// Create a new express application 
var app = express();
// Add static files location, adds a middleware for serving static files to your Express app.
app.use(express.static("static"));  // middleware
// Make sure we get the POST parameters
app.use(express.urlencoded({ extended: true }));
// To use bootstrap 
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
// Load view engine    
app.set("view engine", "pug"); // // Set up template engine 
// Set the view directory of the app 
app.set("views", "./app/views");
// Get the functions in the db.js file to use
const db = require('./services/db');
// Get the models
const { User } = require("./models/user");
const { User1 } = require("./models/user1");
app.use(express.urlencoded({ extended: true }));
var session = require('express-session');
app.use(session({
    secret: 'secretkeysdfjsflyoifasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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
// Task Single user report 
app.get("/report/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserReport();
    console.log(user);
    res.render('report', { user: user });
});
// Task All_Users page 
app.get("/allusers", async function (req, res) {
    let allusers = [1, 2, 3, 4];
    res.render('user_page', { allusers: allusers });
});
// Task single user 
app.get("/single-user/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserIncome();
    await user.getuserExpenses();
    await user.getuserReport();
    console.log(user);
    res.render('user', { 'user': user });
})
//Homepage
app.get("/home/:user_id", async function (req, res) {
    var user_id = req.params.user_id;
    var user = new User(user_id);
    await user.getuserReport();
    console.log(user);
    res.render('home', { user: user });

});
// Create a route for root - /
app.get("/", function (req, res) {
    console.log(req.session);
    if (req.session.uid) {
        res.send('Welcome back, ' + req.session.uid + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});
// Register
app.get('/register', function (req, res) {
    res.render('register');
});

app.post('/set-password', async function (req, res) {
    params = req.body;
    var user1 = new User1(params.email);
    try {
        uId = await user1.getIdFromEmail();
        if (uId) {
            // If a valid, existing user is found, set the password and redirect to the user single page
            await user1.setUserPassword(params.password);
            res.redirect('/single-user/' + uId);
        }
        else {
            // If no existing user is found, add a new one
            newId = await user1.addUser(params.email);
            res.send('Perhaps a page where a new user sets income or expenses would be good here');
        }
    } catch (err) {
        console.error(`Error while adding password `, err.message);
    }
});
// Login
app.get('/login', function (req, res) {
    res.render('login');
});
// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
    params = req.body;
    var user1 = new User1(params.email);
    try {
        uId = await user1.getIdFromEmail();
        if (uId) {
            match = await user1.authenticate(params.password);
            if (match) {
                // Set the session for this user 
                req.session.uid = uId;
                req.session.loggedIn = true;
                console.log(req.session);
                res.redirect('/single-user/' + uId);
            }
            else {
                // TO DO improve the user journey here
                res.send('invalid password');
            }
        }
        else {
            res.send('invalid email');
        }
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});
// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

// Post add Income 
app.post('/add-income', function (req, res) {
    // Adding a try/catch block which will be useful later when we add to the database
    params = req.body; // request body 
    // Note that we need the id to get update the correct user
    var user = new User(params.user_id)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        user.addIncome(params.i_category, params.i_amount_GBP, params.i_date, params.i_id).then(result => {
            // Just a little output for now
            res.redirect('/single-user/' + params.user_id);
        })
    } catch (err) {
        console.error(`Error while adding income `, err.message);
    }
});
// Post Add expenses 
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

// // Create a post route to handle the form submission of the option list
app.post('/category-select', function (req, res) {
    // Retrieve the parameter and redirect to the single user page
    id = req.body.categoryParam;
    res.redirect('/single-user/' + id);
});
// A post route to recieve new data for a students' programme
app.post('/allocate-category', function (req, res) {
    params = req.body;
    var user = new User(params.id)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        user.updateUserCategory(params.category).then(result => {
            res.redirect('/single-user/' + params.id);
        })
    } catch (err) {
        console.error(`Error while adding category `, err.message);
    }
});

// Create route for the calendar
// Here we have a page which demonstrates how to both input dates and display dates
app.get("/calendar", async function (req, res) {
    // Get all the dates from the db to display
    // NB Move this to a model that is appropriate to your project
    sql = "SELECT * from income";
    sql2 = "SELECT * from expenses";
    // We could format dates either in the template or in the backend
    income = [];
    expenses = [];
    results = await db.query(sql);
    // Loop through the results from the database
    for (var row of results) {
        // For some reason the dates are fomatted as jsDates. I think thats the  Mysql2 library at work!
        dt = DateTime.fromJSDate(row['i_date']);
        for (var row of results) {
            dt2 = DateTime.fromJSDate(row['expense_date']);
            // Format the date and push it to the row ready for the template
            // NB Formatting could also be done in the template
            // NB date formats are usually set up to work throughout your app, you would not usually set this in every row.
            // you could put this in your model.
            income.push(dt.toLocaleString(DateTime.DATE_HUGE));
            expenses.push(dt2.toLocaleString(DateTime.DATE_HUGE));
        }
    }
    // Render the calendar template, injecting the dates array as a variable.
    res.render('calendar', { income: income });
    res.render('calendar', { expenses: income });
});
// Capture the date input and save to the db
app.post('/set-date', async function (req, res) {
    params = req.body.date;
    console.log(params);
    //construct a date object from the submitted value - use a library
    var inputDate = DateTime.fromFormat(params, 'yyyy-M-dd');
    console.log(inputDate);
    // Add the date: NB this should be in a model somewhere
    sql = "INSERT into expenses (expense_date) VALUES (?)";
    sql1 = "INSERT into income (i_date) VALUES (?)";
    try {
        await db.query(sql, [inputDate.toSQLDate()]);
    } catch (err) {
        console.error(`Error while adding date `, err.message);
        res.send('sorry there was an error');
    }
    res.send('date added');
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
        res.json(results);

    });
});
// Start server on port 3000
app.listen(3000, function () {
    console.log(`Server running at http://127.0.0.1:3000/`);
});