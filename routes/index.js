const { ensureAuth } = require("../middleware/auth");

// Import Routes
const authRoute = require("./auth");
const plannerRoute = require("./planner/planner");
const notesRoute = require("./notes/notes_routes");

// module.exports = router;

module.exports = function (app) {

    // @desc    Home page
    // @route   Get /
    app.get('/', ensureAuth, (req, res) => {
        res.send('Welcome to the home page ' + req.user.firstName);
    });

    app.use('/planner', plannerRoute);
    app.use('/auth', authRoute);
    app.use('/notes', notesRoute);
}