const e = require("cors");
const databasePool = require("../db.js");

async function setComplete(id){
    const[complete]=await databasePool.query(
        "UPDATE Timer SET description='COMPLETED' WHERE id = ?", 
    [id]);
    return complete;
}

async function getLastTimer(user_id) {
    const [lastTimer] = await databasePool.query(`
        SELECT * FROM Timer
        WHERE id=(SELECT MAX(id) FROM Timer WHERE user_id=?)` ,[user_id]
    );
    return lastTimer;
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
                return res.status(200).json({msg: "Il pomodoro è completato"})
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
            const [lastTimer] = await databasePool.query("SELECT * FROM Timer WHERE id=(SELECT MAX(id) FROM Timer WHERE user_id = ?)", [user_id]);
            console.log(lastTimer);
            if(lastTimer.length > 0) if (lastTimer[0].state == "RUNNING") return res.status(200).json({msg: "Pomodoro già avviato"});
            const [timer] = await databasePool.execute(`
                INSERT INTO Timer(creation_date, description, duration, user_id, step, state) VALUES (NOW(), ?, ?, ?, ?, "RUNNING")
            `, [description, duration, user_id, step]);
            return res.status(200).json({msg: "pomodoro creato", timer});
        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"});
}

exports.completeTimer = async (req, res) => {
    const user_id = +req.params.id;
    if(user_id){
        try {
            const [lastTimer] = await getLastTimer(user_id);

            if(lastTimer[0].state != undefined){
                if(lastTimer[0].state == "RUNNING"){
                    const lastTimerDate = lastTimer[0].creation_date;
                    const timeDifference = Math.abs(lastTimerDate.getTime() - new Date().getTime()) / 1000
                    if ((timeDifference / 60) >= lastTimer.duration){
                        await setComplete(lastTimer[0].id);
                        return res.status(200).json({msg: "Pomodoro completato"});
                    } return res.status(200).json({msg: "Il pomodoro non è ancora finito"})
                }
            } else return res.status(200).json({msg: "Nessun pomodoro iniziato"});
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"});
}

exports.stopTimer = async (req, res) => {
    const id = req.params.id;
    const [lastTimer] = await databasePool.query("SELECT * FROM Timer WHERE id=(SELECT MAX(id) FROM Timer WHERE user_id = ?)", [id]);
    if (id){
        try{
            if(lastTimer[0].state == "RUNNING") {
                const[timer] = await databasePool.execute ( 
                    `UPDATE Timer SET state = "BROKEN" WHERE id = ?`, [lastTimer[0].id]
                );
                return res.status(200).json({msg: "Pomodoro rotto con successo!", timer})
            } return res.status(400).json({msg: "Timer non avviato"})
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }return res.status(400).json({msg: "Informazioni mancanti"});
    
}