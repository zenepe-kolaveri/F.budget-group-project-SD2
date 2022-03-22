// Get the functions in the db.js file to use
const db = require('../services/db');
const { Expenses } = require('./expenses');
const { Income } = require("./income");
const { Expenses } = require("./expenses");

// Create Class of USer 
class User {
    // User id 
    user_id;
    income = [];
    expenses = []
    report = {}
    constructor(user_id) {
        this.user_id = user_id;
<<<<<<< HEAD
        this.expenses = expenses;
        this.income = income;
        this.report = report;
=======
        // this.expenses = expenses
        // this.income = income
        // this.report = report

>>>>>>> 5711d46628dd407506b7846dff9a1bdd42a86884
    }
    // async getuserIncome() {
    //     var sql = "SELECT * from income where user_id = ?"
    //     const results = await db.query(sql, [this.user_id]);
    //     //console.log(results);
    //     //for (var row of results) {
    //     //this.income.push(new Income(row.i_id, row.i_category, row.i_amount_GBP, row.i_date));
    //     //}
    //     return results
    // }

    


    async getuserIncome() {
        var sql = "SELECT * from income where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
<<<<<<< HEAD
        var sql_t = "SELECT SUM(i_amount_GBP) AS total from income WHERE user_id = ?"
=======
        var sql_t = "SELECT SUM(amount_GBP) AS total from income WHERE user_id = ?;"
>>>>>>> 5711d46628dd407506b7846dff9a1bdd42a86884
        const total = await db.query(sql_t, [this.user_id]);
        for (var row of results) {
            this.income.push(new Income(row.i_id, row.i_category, row.i_amount_GBP, row.i_date));
        }
        this.income.push(total)
        console.log(this.income)
    }
<<<<<<< HEAD
=======


>>>>>>> 5711d46628dd407506b7846dff9a1bdd42a86884
    async getuserExpenses() {
        var sql = "SELECT * from expenses where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        var sql_t = "SELECT SUM(amount_GBP) AS total from expenses WHERE user_id = ?;"
        const total = await db.query(sql_t, [this.user_id]);
        for (var row of results) {
            this.expenses.push(new Expenses(row.expense_id, row.category, row.amount_GBP, row.expense_date, row.description));
        }
        this.expenses.push(total)
        console.log(this.expenses)
    }
<<<<<<< HEAD
=======

>>>>>>> 5711d46628dd407506b7846dff9a1bdd42a86884
    async getuserReport() {

        var sql_t = "SELECT SUM(amount_GBP) AS total from expenses WHERE user_id = ?;"
        const e_total = await db.query(sql_t, [this.user_id]);

        var sql_t = "SELECT SUM(i_amount_GBP) AS total from income WHERE user_id = ?;"
        const i_total = await db.query(sql_t, [this.user_id]);
        // let a = {
        //     e_total,i_total
        // }
        this.report["expense_total"] = e_total
        this.report["income_total"] = i_total

        // this.report.push(a)
        console.log(this.report)
    }
<<<<<<< HEAD
}   

=======

}
>>>>>>> 5711d46628dd407506b7846dff9a1bdd42a86884
module.exports = {
    User
}