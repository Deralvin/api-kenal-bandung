const { pool: db } = require("../databases/config");
const fs = require("fs");
const { parse } = require("csv-parse");
const { devNull } = require("os");
const getListCafe = () => {
    return new Promise((resolve, reject) => {
        db.query(`select * from tb_cafe`, (err, result) => {
            if (err) reject(err);
            resolve({ success: 200, data: result });
        })
    })
}
const storeDataFromWorker = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./assets/data_cafe.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        var nama = row[0];
        var alamat = row[1];
        var latitude = row[2].split(",")[0];
        var ternarylon = row[2].split(",")[1];

        const longitude = ternarylon?.trim() || "";



        db.query("INSERT INTO tb_cafe (nama,alamat,latitude,longitude) VALUES ($1,$2,$3,$4)", [nama,alamat,latitude,longitude],(err,result)=>{
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
  });
};

module.exports = {
    getListCafe,
  storeDataFromWorker,
};
