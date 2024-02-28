const e = require("cors");
const databasePool = require("../db.js");
const { get } = require("../routes/timerRoutes.js");

async function setComplete(id){
    const[complete]=await databasePool.query(
        "UPDATE Timer SET description='COMPLETED' WHERE id = ?", 
    [lastTimer[0].id]
    );
    return complete;
}

async function getLastTimer(user_id) {
    const [lastTimer] = await databasePool.query(`
        SELECT * FROM Timer 
        WHERE id=(SELECT MAX(id) FROM Timer WHERE user_id=?)` ,[user_id]
    );
    return [lastTimer];
}

exports.getTimer = async (req, res) => {
    const user_id = +req.params.id;
    if(user_id){
        try{
            const lastTimer = await getLastTimer(user_id);
            return res.status(200).json(lastTimer[0]);
        }catch(err){
            console.error(err)
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"})

}


exports.getRemainingTime = async (req, res) => {
    const user_id = +req.params.id;

    if (user_id) {
        try{
            const lastTimer = await getLastTimer(user_id);
            if(lastTimer[0].state == "RUNNING"){
                const lastTimerDate = lastTimer[0].creation_date;
                const timeDifference = Math.abs(lastTimerDate.getTime() - new Date().getTime()) / 1000

                if(timeDifference / 60 < lastTimer[0].duration) {
                    const minutes = Math.floor(timeDifference / 60);
                    return res.status(200).json({
                        minutes: lastTimer[0].duration - minutes,
                        seconds: 60 - Math.floor(timeDifference - ( minutes * 60))
                    });
                }

                await databasePool.execute(`
                    UPDATE Timer
                    SET state="COMPLETED"
                    WHERE id = ?
                `, [lastTimer[0].id]);
                return res.status(200).json({msg: "Pomodoro completato"})
            } else{
                if(lastTimer[0].state == "BROKEN") return res.status(400).json({msg: "Il pomodoro è rotto"});
                return res.status(400).json({msg: "Il pomodoro è completato"})
            }
        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"});
}

exports.startTimer = async (req, res) => {
    const user_id = req.params.id;
    const {duration, step, description} = req.body;

    if(user_id && duration && step && description){
        try{
            const [timer] = await databasePool.execute(`
                INSERT INTO Timer(creation_date, description, duration, user_id, step, state) VALUES (NOW(), ?, ?, ?, ?, "RUNNING")
            `, [description, duration, user_id, step]);
            return res.status(200).json({msg: "pomodoro creato", timer});
        }catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"});
}

exports.completeTimer = async (req, res) => {
    const user_id = +req.params.id;
    if(user_id){
        try {
            const [lastTimer] = await databasePool.query(`SELECT * FROM Timer 
                WHERE id=(SELECT MAX(id) 
                FROM Timer) 
                AND user_id=?`, [user_id]
            );
            if(lastTimer[0].state == "RUNNING"){
                const lastTimerDate = lastTimer[0].creation_date;
                const timeDifference = Math.abs(lastTimerDate.getTime() - new Date().getTime()) / 1000
                if ((timeDifference / 60) == lastTimer.duration){
                    const complete = await setComplete(id);
                    return res.status(200).json({msg: "Pomodoro completato"});
                }
            }
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }return res.status(400).json({msg: "informazioni mancanti"});
}

exports.stopTimer = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    var [state] = await databasePool.query("SELECT state FROM Timer WHERE id=?",[id]);
    console.log(state)
    if (id){
        try{
            const isRUNNING = (state == "RUNNING") ? true : false;
            console.log(isRUNNING)
            if(isRUNNING) {
                const[timer] = await databasePool.execute ( 
                    `UPDATE Timer SET state = 'BROKEN' WHERE id = ?`, [id] 
                );
                return res.status(200).json({msg: "Pomodoro rotto con successo!"})
            } return res.status(400).json({msg: "Timer non avviato"})
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }return res.status(400).json({msg: "Informazioni mancanti"});
    
}