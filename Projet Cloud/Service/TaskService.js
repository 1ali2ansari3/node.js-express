const pool = require('../db');

module.exports.getAllTask = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM task ');
        return rows;
    } catch (err) {
        console.error(err);
        throw err; 
     }
};


module.exports.getTaskId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM task where idTask = ?', [id]);
    return rows;
};


module.exports.deleteTask = async (id) => {
    try {
        const [{affectedRows}] = await pool.query('DELETE FROM task WHERE idTask = ?', [id]);
        return affectedRows;
    } catch (error) {
        throw error; 
    }
};



module.exports.add0rEditTask = async (obj, id = 0) => {
    const title = obj.name; 

    const [{ affectedRows }] = await pool.query("INSERT INTO task (title, status) VALUES (task, 0)", [title]);
    return affectedRows;
};



