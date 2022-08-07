const fs = require("fs");
const fastcsv = require("fast-csv");
const {pool:db}  = require('./src/databases/config');

let stream = fs.createReadStream("./assets/data_wisata_belanja.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();
    // connect to the PostgreSQL database
    // save csvData
  });
stream.pipe(csvStream);


const query =
  "INSERT INTO category (jenis_usaha, nama, alamat, koordinat) VALUES ($1, $2, $3, $4)";
db.connect((err, client, done) => {
  if (err) throw err;
  try {
    csvData.forEach(row => {
      client.query(query, row, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("inserted " + res.rowCount + " row:", row);
        }
      });
    });
  } finally {
    done();
  }
});