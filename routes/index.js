const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Import Routes
const authRoute = require("./auth");
const plannerRoute = require("./planner/planner");
const notesRoute = require("./notes/notes_routes");

module.exports = function (app) {
    
    const projectsRoute = require("./projects/projects.js")(ensureAuth);

    // @desc    Home page
    // @route   Get /
    app.get('/', ensureAuth, (req, res) => {
        res.send('Welcome to the home page ' + req.user.firstName);
    });

    // @desc    Login page
    // @route   Get /login
    app.get('/login', ensureGuest, (req, res) => {
        res.send('Login');
    });

    app.use('/planner', plannerRoute);
    app.use('/auth', authRoute);
    app.use('/notes', notesRoute);
    app.use('/projects', projectsRoute);
}