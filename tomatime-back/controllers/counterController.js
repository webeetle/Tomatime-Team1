const databasePool = require ("../db.js");


exports.getCounters = async (req, res) => {
    const user_id = +req.params.id;
    try{
        const [doneTasks] = await databasePool.query(`SELECT Count(*) as doneTasks FROM Task WHERE state="DONE" AND user_id = ?`, [user_id]);
        const [completedTomatoes] = await databasePool.query(`SELECT Count(*) as completedTomatoes FROM Timer WHERE description="Pomodoro" AND state="COMPLETED" AND user_id = ?`, [user_id]);
        const [brokeTomatoes] = await databasePool.query(`SELECT Count(*) as brokeTomatoes FROM Timer WHERE description="Pomodoro" AND state="BROKEN" AND user_id = ?`, [user_id]);
        return res.status(200).json({counters: [doneTasks, completedTomatoes, brokeTomatoes]});
        
    } catch(err){
        console.error(err);
        return res.sendStatus(500);
    }
}