// Get the functions in the db.js file to use
const db = require('../services/db');

// Create Income Class 
class Income {
    // Income i_id
    i_id;
    // Income category
    i_category;
    // Income Amount 
    i_amount_GBP;
    // Income date 
    i_date;
    constructor(i_id, i_category, i_amount_GBP, i_date) {
        this.i_id = i_id;
        this.i_category = i_category;
        this.i_amount_GBP = i_amount_GBP;
        this.i_date = i_date;
    }
    async getuserIncome() {
        var sql = "SELECT * from income where user_id = ?";
        const results = await db.query(sql, [this.user_id]);
        var sql_t = "SELECT SUM(i_amount_GBP) AS total from income WHERE user_id =?";
        const total = await db.query(sql_t, [this.user_id]);
        var inc=[];
        for (var row of results) {
            inc.push({i_id: row.i_id, i_category:row.i_category, i_amount_GBP:row.i_amount_GBP, i_date:row.i_date});
        }
        this.income.push(inc);
        this.income.push(total);
        console.log(this.income);
    }
}
module.exports = {
    Income
}
