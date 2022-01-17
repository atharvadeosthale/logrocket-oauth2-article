let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    register,
    getUser,
    isValidUser,
  };
};

console.log(pgPool);

var crypto = require("crypto");

function register(username, password, cbFunc) {
  var shaPass = crypto.createHash("sha256").update(password).digest("hex");

  const query = `INSERT INTO users (username, user_password) VALUES ('${username}', '${shaPass}')`;

  pgPool.query(query, cbFunc);
}

function getUser(username, password, cbFunc) {
  var shaPass = crypto.createHash("sha256").update(password).digest("hex");

  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = '${shaPass}'`;

  pgPool.query(getUserQuery, (response) => {
    cbFunc(
      false,
      response.results && response.results.rowCount === 1
        ? response.results.rows[0]
        : null
    );
  });
}

function isValidUser(username, cbFunc) {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  console.log("hi");
  const checkUsrcbFunc = (response) => {
    const isValidUser = response.results
      ? !(response.results.rowCount > 0)
      : null;

    console.log(isValidUser);

    cbFunc(response.error, isValidUser);
  };

  pgPool.query(query, checkUsrcbFunc);
}
