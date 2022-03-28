// Get the functions in the db.js file to use
const db = require('../services/db');
const { Expenses } = require('./expenses');
const { Income } = require("./income");
// Create Class of USer 
class User {
    // User id 
    user_id;
    income = [];
    expenses = [];
    report = {};
    constructor(user_id) {
        this.user_id = user_id;
    }
    async getuserIncome() {
        var sql = "SELECT * from income where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        var sql_t = "SELECT SUM(i_amount_GBP) AS total from income WHERE user_id =?;"
        const total = await db.query(sql_t, [this.user_id]);
        var inc=[]
        for (var row of results) {
            inc.push({i_id: row.i_id, i_category:row.i_category, i_amount_GBP:row.i_amount_GBP, i_date:row.i_date});
        }
        this.income.push(inc)
        this.income.push(total)
        console.log(this.income)
    }
    async getuserExpenses() {
        var sql = "SELECT * from expenses where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        var sql_t = "SELECT SUM(amount_GBP) AS total from expenses WHERE user_id =?;"
        const total = await db.query(sql_t, [this.user_id]);
        var ex=[]
        for (var row of results) {
            ex.push({expense_id: row.expense_id, category:row.category, amount_GBP:row.amount_GBP, expense_date:row.expense_date, description:row.description});
        }
        this.expenses.push(ex)
        this.expenses.push(total)
        console.log(this.expenses)
    }
    async getuserReport() {

        var sql_t = "SELECT SUM(amount_GBP) AS total from expenses WHERE user_id = ?;"
        const e_total = await db.query(sql_t, [this.user_id]);
        var sql_t = "SELECT SUM(i_amount_GBP) AS total from income WHERE user_id = ?;"
        const i_total = await db.query(sql_t, [this.user_id]);
        this.report["expense_total"] = e_total
        this.report["income_total"] = i_total

        // this.report.push(a)
        console.log(this.report)
    }
}
module.exports = {
    User
}