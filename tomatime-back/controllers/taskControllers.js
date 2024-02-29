const databasePool = require("../db.js");

async function withdraw(id){
  const [task] = await databasePool.query(
    "SELECT * FROM Task Where id = ?",
    [id]
  );

  return task;
}

async function isWorkingFree(user_id){

  const [check] = await databasePool.query(`SELECT * FROM Task WHERE state="WORKING" AND user_id=1`, [user_id]);
  return check.length > 0 ? false : true;
}

exports.getTask = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const task = await withdraw(id);

      return res.status(200).json({
        task
      });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
}

exports.getTasks = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const [task] = await databasePool.query(
        "SELECT * FROM Task Where user_id = ?",
        [id]
      );

      const todo = [task.filter((element) => element.state == "TODO")];
      const inProgress = [task.filter((element) => element.state == "WORKING")];
      const done = [task.filter((element) => element.state == "DONE")];

      return res.status(200).json({
        todo,
        inProgress,
        done,
      });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
};

exports.addTask = async (req, res) => {
  const { title, description, user_id } = req.body;
  if (user_id && title) {
    try {
      const [task] = await databasePool.execute(
        "INSERT INTO Task(title , description, date_of_creation, state, user_id) VALUES (?, ?, NOW(), 'TODO', ?)",
        [title, description, user_id]
      );
      return res.status(200).json({
        msg: "task creato con successo",
        task,
      });
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};


exports.moveTask = async (req, res) => {
  const id = req.params.id
  const { target, user_id} = req.body;
  if (id && target) {
    try {
      const task = await withdraw(id);
      const state = task[0].state;
      //const canMoveWorking = (state == "TODO" || state == "DONE") ? true : false;
      const canMoveFromWorking = state == "WORKING" ? true : false;
      
      if(target == "DONE"){
        if(canMoveFromWorking){
          const [move] = await databasePool.execute(`
              UPDATE Task
              SET state = ?, date_of_completition = NOW()
              WHERE id = ?
            `,[target, id]);
          return res.status(200).json({ msg: "Task aggiornato" });
        }
      }

      if(target == "TODO" ){
        if(canMoveFromWorking){
          const [move] = await databasePool.execute(`
            UPDATE Task
            SET state = ?
            WHERE id = ?
          `,[target, id]);
          return res.status(200).json({ msg: "Task aggiornato" });
        } else return res.status(400).json({ msg: "Non concesso" });
      } 

      if(target=="WORKING"){
        if(await isWorkingFree(user_id)){
          const [move] = await databasePool.execute(`
            UPDATE Task
            SET state = ?
            WHERE id = ?
          `,[target, id]);
          return res.status(200).json({ msg: "Task aggiornato" });
        }
      }
      
 
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  } return res.status(400).json({
    msg: "info non inserite",
    id,
    target,
    user_id
  })
} 

exports.deleteTask = async ( req, res ) => {
  const id = req.params.id
  if(id){
      try {
          const task = await withdraw(id);
          const state = task[0].state;
          const isTODO = state == "TODO" ? true : false;
          if(isTODO){

              const[task]= await databasePool.execute(
                  "DELETE FROM Task WHERE id=?", [id]
              )

              if(task.affectedRows===0){
                  return res.status(404).json({msg: 'Nessun task eliminato.'});
              }

              return res.status(200).json({
                  msg: "Task aggiornato con successo!",
                  id,
                  task: task[0]
              })

          } else return res.status(400).json({ msg: "Task non in TODO" });
      
      } catch (err) {
          console.error(err);
          return res.sendStatus(500);
      }

  } return res.status(400).json({
      msg: "Id non inserito"
  })
}

exports.editTask = async ( req, res )=>{
  const id = req.params.id
  const { title, description } = req.body;

  if(id && title){
      try {
          
          const task = await withdraw(id);
          const state = task[0].state;
          const isTODO = state == "TODO" ? true : false;

          if (isTODO){

              const[task]= await databasePool.execute(
                  "UPDATE Task SET title=?, description=? WHERE id=?", [title, description, id]
              )

              if(task.affectedRows===0){
                  return res.status(404).json({msg: 'Nessun task aggiornato.'});
              }

              return res.status(200).json({
                  msg: "Task aggiornato con successo!",
                  id,
                  task: task[0]
              })
          } else return res.status(400).json({ msg: "Task non in TODO" });
      } catch (err) {
          console.error(err);
          return res.sendStatus(500);
      }
  }return res.status(400).json({
      msg: "informazioni mancanti"
  })
}