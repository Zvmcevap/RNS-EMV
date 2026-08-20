const express = require("express");

const userControllers = require("../controllers/user-controller");
const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/profile")
  .get(
    authenticationMiddleware,
    authorizationMiddleware("admin", "employee"),
    userControllers.getMyProfile
  )
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin", "employee"),
    userControllers.updateMyProfile
  );

module.exports = router;