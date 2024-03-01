const databasePool = require("../db.js");



exports.getUserList = async (req, res) => {
    try{
        
        const [userList] = await databasePool
            .query(`SELECT * FROM User`);
        return res.status(200).json({
            msg: "Lista utenti",
            userList
        })

    }catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const [user] = await databasePool
            .query(`
                SELECT * 
                FROM User 
                WHERE username = ?
                AND password = ?
            `, [username, password]);

        if(user.length > 0){
            return res.status(200).json({
                msg: `Bentornato ${user[0].username}`,
                canLogin: true
                
                ,
                user
            })
        }
        return res.status(200).json({
            msg: "Nome utente o password errati!",
            canLogin: false,
            user
        })

    }catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}


exports.registration = async (req, res) => {
    try{
        const {username, password, email} = req.body;
        if(username.length < 16 && password.length < 8){
            const [user] = await databasePool
                .execute(`INSERT INTO User(username, email, password, date_of_registration) VALUES (?, ?, ?, NOW())`, [username, email, password]);
            return res.status(200).json({
                msg: "Benvenuto"
            });
        } if(username.length > 16){
            return res.status(400).json({
                msg: "Username troppo lungo per la registrazione"
            });
        } return res.status(400).json({
            msg: "Password troppo lunga"
        })
    } catch (err){
        console.error(err);
        return res.sendStatus(500);
    }
}