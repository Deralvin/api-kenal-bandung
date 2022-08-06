const {pool:db}  = require('../databases/config');

const getListWisata = ()=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from tb_wisata_belanja`,(err,result)=>{
            if(err) reject(err);
            resolve({success:200,data:result});
        })
    })
}

module.exports={
    getListWisata
}