const express = require("express");
const router = express.Router({ mergeParams: true });
const { onGetDashboard } = require("../handlers/user");
const { loginRequired } = require("../middleware/auth");

router.get("/dashboard", loginRequired, onGetDashboard);

module.exports = router;
