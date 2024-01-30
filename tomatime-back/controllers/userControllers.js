const databasePool = require("../db.js");


exports.registration = async (req, res) => {
    try{
        const {username, password} = req.body;
        const [user] = await databasePool
            .execute(`INSERT INTO User(username, password, date_of_registration) VALUES (?, ?, NOW())`, [username, password]);
        return res.status(200).json({
            msg: "Benvenuto"
        });
    } catch (err){
        console.error(err);
        return res.sendStatus(500);
    }
}