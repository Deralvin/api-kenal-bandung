const { pool: db } = require('../databases/config');
const fs = require("fs");
const { parse } = require("csv-parse");
const { devNull } = require('os');
const getListWisata = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from tb_wisata_belanja`, (err, result) => {
            console.log("data result ")
            console.log(result)
            if (err) reject(err);
            resolve({ success: 200, data: result });
        })
    })
}

const storeDataFromWorker = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream("./assets/data_wisata_belanja.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                console.log(row);
                db.query("INSERT INTO tb_wisata_belanja (jenis_usaha,nama,alamat,koordinat) VALUES ($1,$2,$3,$4)", [row[0], row[1], row[2], row[3]],(err,result)=>{
                    if (err) reject(err);
                    console.log(result)
                })
            })
            .on("end", function () {
                console.log("finished");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
        // db.query(`select * from tb_wisata_belanja`,(err,result)=>{
        //     if(err) reject(err);
        //     resolve({success:200,data:result});
        // })
    })
}

module.exports = {
    getListWisata,
    storeDataFromWorker
}