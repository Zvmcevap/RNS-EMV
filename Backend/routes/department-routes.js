const express = require("express");

const {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllDepartments)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createDepartment
  );

router
  .route("/:id")
  .get(getDepartmentById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updateDepartment
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deleteDepartment
  );

module.exports = router;