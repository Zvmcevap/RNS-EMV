const express = require("express");

const {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification-controller");

const authenticationMiddleware = require("../middlewares/authentication-middleware");
const authorizationMiddleware = require("../middlewares/authorization-middleware");

const router = express.Router();

router
  .route("/")
  .get(
    authenticationMiddleware,
    getAllNotifications
  )
  .post(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    createNotification
  );

router
  .route("/:id")
  .get(
    authenticationMiddleware,
    getNotificationById
  )
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    updateNotification
  )
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    deleteNotification
  );

module.exports = router;