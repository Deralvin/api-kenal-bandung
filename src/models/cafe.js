const { pool: db } = require("../databases/config");
const fs = require("fs");
const { parse } = require("csv-parse");
const { devNull } = require("os");
const getListCafe = () => {
    return new Promise((resolve, reject) => {
        db.query(`select id,latitude::float as _lats from tb_cafe`, (err, result) => {
          console.log("erro ",err)
            if (err) reject(err);
            resolve({ success: 200, data: result });
        })
    })
}


// SELECT
// *
// ,((ACOS(SIN(-6.905221932812897 * PI() / 180) * SIN((latitude::float) * PI() / 180) + COS(-6.905221932812897 * PI() / 180) * COS(latitude::float * PI() / 180) * COS((107.62012263558223 - longitude::float) * PI() / 180)) * 180 / PI()) * 60 * 1.1515) AS distance 
// FROM tb_cafe 
// WHERE
// (
//   latitude::float BETWEEN (-6.905221932812897 - 1) AND (-6.905221932812897 +1)
//   AND longitude::float BETWEEN (107.62012263558223 - 1) AND (107.62012263558223 + 1)
// )
// ORDER BY distance ASC
// limit 25;


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
