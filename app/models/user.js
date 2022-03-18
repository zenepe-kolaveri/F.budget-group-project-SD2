// Get the functions in the db.js file to use
const db = require('../services/db');
const { Income } = require("./income");
class User {
    // User id 
    user_id;
    income = [];
    constructor(user_id) {
        this.user_id = user_id;
    }
    async getuserIncome() {
        var sql = "SELECT * from income where user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        console.log(results);
        for (var row of results) {
            this.income.push(new Income(row.i_id, row.i_category, row.i_amount_GBP, row.i_date));
        }
    }
    async getuserName() {
        if (typeof this.category !== 'string') {
            var sql = "SELECT * from budget_user where user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.user_id = results[0].user_id;
        }
    }
}
module.exports = {
    User
}