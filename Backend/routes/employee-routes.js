const express = require("express");

const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee-controller");

const multerUpload = require("../middlewares/multer-middleware");
const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    multerUpload.single("imageURL"),
    createEmployee
  );

router
  .route("/:id")
  .get(getEmployeeById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    multerUpload.single("imageURL"),
    updateEmployee
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deleteEmployee
  );

module.exports = router;