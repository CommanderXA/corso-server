const express = require("express");
const { ensureAuth } = require("../../middleware/auth");
const router = express.Router();

// NOTES
require("./notes")(router, ensureAuth);

// NOTE GROUPS
require("./note_groups")(router, ensureAuth);

module.exports = router;