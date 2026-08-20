const express = require("express");

const {
  getAllAttendance,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendance-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllAttendance)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createAttendance
  );

router
  .route("/:id")
  .get(getAttendanceById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updateAttendance
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deleteAttendance
  );

module.exports = router;