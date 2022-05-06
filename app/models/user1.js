const db = require('../services/db');
const bcrypt = require("bcryptjs");
class User1 {
    // Id of the user
    user_id;
    // Email of the user
    email;
    constructor(email) {
    this.email = email;
    }
// Get an existing user id from an email address, or return false if not found
async getIdFromEmail() {
    var sql = "SELECT user_id FROM budget_user WHERE budget_user.email = ?";
    const result = await db.query(sql, [this.email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
        this.user_id = result[0].user_id;
        return this.user_id;
    }
    else {
        return false;
    }
}
// Add a password to an existing user
async setUserPassword(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE budget_user SET password = ? WHERE budget_user.user_id = ?";
    const result = await db.query(sql, [pw, this.user_id]);
    return true;
}
// Add a new record to the users table
async addUser(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO budget_user (email, password) VALUES (? , ?)";
    const result = await db.query(sql, [this.email, pw]);
    console.log(result.insertId);
    this.user_id = result.insertId;
    return this.user_id;
}
// Test a submitted password against a stored password
async authenticate(submitted) {
    // Get the stored, hashed password for the user
    var sql = "SELECT password FROM budget_user WHERE user_id = ?";
    const result = await db.query(sql, [this.user_id]);
    const match = await bcrypt.compare(submitted, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
}
}
module.exports = {
    User1
    }