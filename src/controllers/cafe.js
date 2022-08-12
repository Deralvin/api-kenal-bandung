const models = require('../models/cafe');
const getListCafe =async(req,res)=>{
    try{
        const result = await models.getListCafe();
        return res.status(200).json({code:200,data:result.data.rows});
    }catch(err){
        res.status(500).send("error");
    }
}
const getWorkerIntoDb = async(req,res)=>{
    try{
        const result = await models.storeDataFromWorker();
        return res.status(200).json({code:200,data:result.data.rows});
    }catch(err){
        res.status(500).send("error");
    }
}

module.exports={
    getWorkerIntoDb,
    getListCafe
}