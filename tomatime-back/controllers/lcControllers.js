const databasePool = require ("../db.js");



async function lcSteps(){
    const [LC] = await databasePool.query("SELECT * FROM LC");
        return LC.length;
}

exports.getLC = async (req, res) => {
    const id = +req.body.params;
    if(id){
        try{

            const [LC] = await databasePool.query("SELECT * FROM LC WHERE id = ?", [id]);
            return res.status(200).json(LC)
    
        }catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    }else return res.status(400).json({
        msg: "ID NON TROVATO"
    })
    

}

exports.getNextStep = async (req, res) => {
    const currentStep = +req.params.id;
    
    if(currentStep){
        try{
            if(currentStep != await lcSteps()){
                const [nextStep] = await databasePool.query("SELECT * FROM LC WHERE id=?",[currentStep+1]);
                return res.status(200).json(nextStep);
            }

            const [nextStep] = await databasePool.query("SELECT * FROM LC WHERE id=?",[1]);
            return res.status(200).json(nextStep);


        } catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    } return res.status(400).json({msg: "Informazioni mancanti"});
}