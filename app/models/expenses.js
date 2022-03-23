// Get the functions in the db.js file to use
const db = require('../services/db');
class Expenses {
    // expense_id
    expense_id;
    // expense category
    category;
    // expense Amount 
    amount_GBP
    // expense date 
    expense_date
    // description
    description;
    constructor(expense_id, category, amount_GBP, expense_date, description) {
        this.expense_id = expense_id;
        this.category = category;
        this.amount_GBP = amount_GBP;
        this.expense_date = expense_date;
        this.description = description;
    }
    async getuserExpenses() {
        if (typeof this.category !== 'string') {
            var sql = "SELECT * from expenses where expense_id = ?"
            const results = await db.query(sql, [this.expense_id]);
            this.expense_id = results[0].id;
            this.category = results[0].category;
            this.amount_GBP = results[0].amount;
            this.expense_date = results[0].date;
            this.description = description;
        }

    }
}
module.exports = {
    Expenses
}
