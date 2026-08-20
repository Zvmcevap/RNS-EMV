const express = require("express");

const {
  getAllPerformances,
  createPerformance,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} = require("../controllers/performance-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(getAllPerformances)
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createPerformance
  );

router
  .route("/:id")
  .get(getPerformanceById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updatePerformance
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deletePerformance
  );

module.exports = router;