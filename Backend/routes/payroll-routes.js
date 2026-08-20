const express = require("express");

const {
  getAllPayrolls,
  createPayroll,
  getPayrollById,
  updatePayroll,
  deletePayroll,
} = require("../controllers/payroll-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllPayrolls)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createPayroll
  );

router
  .route("/:id")
  .get(getPayrollById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updatePayroll
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deletePayroll
  );

module.exports = router;