let userDB;

module.exports = (injectedUserDB) => {
  userDB = injectedUserDB;

  return {
    registerUser,
    login,
  };
};

function registerUser(req, res) {
  userDB.isValidUser(req.body.username, (error, isValidUser) => {
    if (error || !isValidUser) {
      const message = error
        ? "Something went wrong!"
        : "This user already exists!";

      sendResponse(res, message, error);

      return;
    }

    userDB.register(req.body.username, req.body.password, (response) => {
      sendResponse(
        res,
        response.error === undefined ? "Success!!" : "Something went wrong!",
        response.error
      );
    });
  });
}

function login(query, res) {}

function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
