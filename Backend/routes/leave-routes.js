const express = require("express");

const {
  getAllLeaves,
  createLeave,
  getLeaveById,
  updateLeave,
  deleteLeave,
} = require("../controllers/leave-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllLeaves)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createLeave
  );

router
  .route("/:id")
  .get(getLeaveById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updateLeave
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deleteLeave
  );

module.exports = router;