// Get the functions in the db.js file to use
const db = require('../services/db');
const { Expenses } = require('./expenses');
const { Income } = require("./income");
class User {
    // User id 
    user_id;
    income = [];
    expenses = []
    constructor(user_id) {
        this.user_id = user_id;
    }
    async getuserIncome() {
        var sql = "SELECT * from income where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        //console.log(results);
        //for (var row of results) {
        //this.income.push(new Income(row.i_id, row.i_category, row.i_amount_GBP, row.i_date));
        //}
        return results
    }

    async getuserExpenses() {
        var sql = "SELECT * from expenses where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        console.log("this");
        console.log(results);
        console.log("end");
        var total 
        for (var row of results) {
            this.expenses.push(new Expenses(row.expense_id, row.category, row.amount_GBP, row.expense_date, row.description));
        }
    }

}
module.exports = {
    User
}