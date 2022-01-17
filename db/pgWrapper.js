const Pool = require("pg").Pool;

function query(queryString, cbFunc) {
  const pool = new Pool({
    user: "atharva",
    host: "localhost",
    database: "oauth2test",
    password: "",
    port: 5432,
  });

  pool.query(queryString, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}

function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null,
  };
}

module.exports = {
  query,
};
