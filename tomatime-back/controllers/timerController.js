const e = require("cors");
const databasePool = require("../db.js");

exports.getRemainingTime = async (req, res) => {
    const user_id = +req.params.id;

    if (user_id) {
        try{
            const [lastTimer] = await databasePool.query(`SELECT * FROM Timer WHERE id=(SELECT MAX(id) FROM Timer)`);
            console.log(lastTimer[0].state)
            if(lastTimer[0].state == "RUNNING"){
                const lastTimerDate = lastTimer[0].creation_date;
                const timeDifference = Math.abs(lastTimerDate.getTime() - new Date().getTime()) / 1000

                if(timeDifference / 60 < lastTimer[0].duration) {
                    const minutes = Math.floor(timeDifference / 60);
                    return res.status(200).json({
                        minutes,
                        seconds: Math.floor(timeDifference - ( minutes * 60))
                    });
                }

                await databasePool.execute(`
                    UPDATE Timer
                    SET state="COMPLETED"
                    WHERE id = ?
                `, [lastTimer[0].id]);
                return res.status(200).json({msg: "Pomodoro completato"})
            } return res.status(400).json({msg: "Il pomodoro è rotto o completato"})
        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "informazioni mancanti"});
}