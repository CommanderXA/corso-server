const express = require("express");
const { ensureAuth } = require("../../middleware/auth");
const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
    res.send('Planner');
});

// TODOS
require("./todos")(router, ensureAuth);

// MEETINGS
require("./meetings")(router, ensureAuth);

// PLANS 
require("./plans")(router, ensureAuth);

module.exports = router;