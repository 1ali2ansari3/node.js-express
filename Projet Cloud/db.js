const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'hesoyam',
  database: 'todolist_db',
 
});



module.exports = pool