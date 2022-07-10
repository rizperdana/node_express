module.exports = app => {
  const users = require("../controllers/user.controller");
  var router = require("express").Router();

  // POST /v1/api/users
  router.post("/", users.create);

  // GET /v1/api/users
  router.get("/", users.list);

  // GET /v1/api/users/:id
  router.get("/:id", users.get);

  // PUT /v1/api/users/:id
  router.put("/:id", users.update);

  // DELETE /v1/api/users/:id
  router.delete("/:id", users.delete);

  app.use("/v1/api/users", router)
}