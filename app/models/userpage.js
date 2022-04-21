// Get the functions in the db.js file to use
const db = require('../services/db');
class Allusers {
    userlist=[];

    constructor() {
    }

    async getAllUsers() {
        this.userlist=[1,2,3,4];


        console.log(this.userlist);
    }
}
module.exports = {
    Allusers
}