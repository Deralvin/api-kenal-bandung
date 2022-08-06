const Pool = require('pg').Pool;
const { DB_URI } = process.env;

const pool = new Pool({
  connectionString: DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  pool
};
