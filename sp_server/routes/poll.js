const express = require("express");
const router = express.Router({ mergeParams: true });
const { onGetPoll,
        onCreatePoll,
        onVotePoll,
        onDeletePoll } = require("../handlers/poll");
const { ensureCorrectUser } = require("../middleware/auth");

router.get("/:id", onGetPoll);
router.post("/createPoll", onCreatePoll);
router.put("/:id", onVotePoll);
router.delete("/:id/deleteRequest/:user_id", ensureCorrectUser, onDeletePoll); // Login required

module.exports = router;
