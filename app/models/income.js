// Get the functions in the db.js file to use
const db = require('../services/db');

// Create Income Class 
class Income {
    // Income i_id
    i_id;
    // Income category
    i_category;
    // Income Amount 
    i_amount_GBP
    // Income date 
    i_date
    constructor(i_id, category, amount, date) {
        this.i_id = i_id;
        this.i_category = category;
        this.i_amount_GBP = amount;
        this.i_date = date;
    }
    async getuserIncome() {
        if (typeof this.category !== 'string') {
            var sql = "SELECT * from income where i_id = ?"
            const results = await db.query(sql, [this.id]);
            this.i_id = results[0].i_id;
            this.i_category = results[0].category;
            this.i_amount = results[0].amount;
            this.i_date = results[0].date;
        }
    }

}
module.exports = {
    Income
}
