module.exports = (router, app, testAPIService) => {
  router.post("/hello", app.oauth.authorise(), testAPIService.helloWorld);

  return router;
};
