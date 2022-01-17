module.exports = (router, app, authenticator) => {
  router.post("/register", authenticator.registerUser);
  router.post("/login", app.oauth.grant(), authenticator.login);

  return router;
};
