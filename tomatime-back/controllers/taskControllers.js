const databasePool = require("../db.js");




exports.getTask = async (req, res) => {

    const {id} = req.body;
    if(id){
        try{
            const [user] = await databasePool.query("SELECT * FROM Task Where user_id = ?", [id]);

            const todo = [user.filter((element) => element.state == "TODO")];
            const inProgress = [user.filter((element) => element.state == "DOING")];
            const done = [user.filter((element) => element.state == "DONE")];

            return res.status(200).json({
                msg: "TASK: ",
                todo,
                inProgress,
                done
            });

        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    }
}