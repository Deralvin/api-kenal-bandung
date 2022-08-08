const models = require('../models/wisata');
const getListWisata =async(req,res)=>{
    try{
        const result = await models.getListWisata();
        return res.status(200).json({code:200,data:result.data.rows});
    }catch(err){
        res.status(500).send(err);
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
    getListWisata,
    getWorkerIntoDb
}