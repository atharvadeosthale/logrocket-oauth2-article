let userDB;
let tokenDB;

module.exports = (injectedUserDB, injectedTokenDB) => {
  userDB = injectedUserDB;
  tokenDB = injectedTokenDB;

  return {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
  };
};

function getClient(clientID, clientSecret, cbFunc) {
  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null,
  };

  cbFunc(false, client);
}

function grantTypeAllowed(clientID, grantType, cbFunc) {
  cbFunc(false, true);
}

function getUser(username, password, cbFunc) {
  userDB.getUser(username, password, cbFunc);
}

function saveAccessToken(accessToken, clientID, expires, user, cbFunc) {
  tokenDB.saveAccessToken(accessToken, user.id, cbFunc);
}

function getAccessToken(bearerToken, cbFunc) {
  tokenDB.getUserIDFromBearerToken(bearerToken, (userID) => {
    const accessToken = {
      user: {
        id: userID,
      },
      expires: null,
    };

    cbFunc(userID === null, userID === null ? null : accessToken);
  });
}
