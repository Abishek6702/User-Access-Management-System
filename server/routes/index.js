const express = require("express");
const authController = require("../controllers/authController");
const softwareController = require("../controllers/softwareController");
const requestController = require("../controllers/requestController");
const { verifyToken, isAdmin, isManager } = require("../middlewares/auth");

const router = express.Router();

// login register routes
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

// software routes to add edit delete
router.post(
  "/software",
  verifyToken,
  isAdmin,
  softwareController.createSoftware
);
router.get("/software", verifyToken, softwareController.getSoftwares);
router.put(
  "/software/:id",
  verifyToken,
  isAdmin,
  softwareController.updateSoftware
);
router.delete(
  "/software/:id",
  verifyToken,
  isAdmin,
  softwareController.deleteSoftware
);

 // to post requests, chnage status, get all request, and particular users
router.post("/requests", verifyToken, requestController.submitRequest);


router.patch(
  "/requests/:id",
  verifyToken,
  isManager,
  requestController.manageRequest
);


router.get(
  "/requests/pending",
  verifyToken,
  isManager,
  requestController.getPendingRequests
);
router.get("/requests",verifyToken,isManager, requestController.getAllRequests);
router.get("/requests/mine",verifyToken,requestController.getMyRequests);

module.exports = router;
