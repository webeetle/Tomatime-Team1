const databasePool = require("../db.js");

exports.getTask = async (req, res) => {
  const { id } = req.body;
  if (id) {
    try {
      const [task] = await databasePool.query(
        "SELECT * FROM Task Where user_id = ?",
        [id]
      );

      const todo = [task.filter((element) => element.state == "TODO")];
      const inProgress = [task.filter((element) => element.state == "DOING")];
      const done = [task.filter((element) => element.state == "DONE")];

      return res.status(200).json({
        msg: "TASK: ",
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
  const { title, description, id } = req.body;
  if (id && title && description) {
    try {
      const [task] = databasePool.execute(
        "INSERT INTO Task(title , description, date_of_creation, state, user_id) VALUES (?, ?, NOW(), 'TODO', ?)",
        [title, description, id]
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
