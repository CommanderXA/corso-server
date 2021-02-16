// Import Routes
const plannerRoute = require("../planner/planner");
const notesRoute = require("../notes/notes_routes");
const express = require("express");
const router = express.Router();

// Import Model
const Project = require("../../models/projects/Project");
const Planner = require("../../models/Planner");

module.exports = function (ensureAuth) {

    // @desc    Home page
    // @route   Get /
    router.get('/', ensureAuth, async (req, res) => {
        try {
            const project = await Project.find({ user: req.user.id }).sort({ createdAt: 'desc' });
            res.json(project);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save project
    // @route   GET /planner/meeting
    router.post('/', ensureAuth, async (req, res) => {
        try {       
            req.body.user = req.user.id;
            let project = await Project.create(req.body);
            let planner = await Planner.create({project: project._id});
            res.json(project);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific meeting
    // @route   GET /planner/meeting/:meetingId
    router.get('/:projectId', ensureAuth, async (req, res) => {
        try {
            const project = await Project.findById(req.params.projectId);

            if (!project) {
                return res.json('404 Error');
            }

            if (project.user != req.user.id) {
                res.json('404 Error');
            } else {
                res.json(project);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE project
    // @route   DELETE /planner/meeting/:meetingId
    router.delete('/:projectId', ensureAuth, async (req, res) => {
        try {
            let project = await Project.findById(req.params.projectId);

            if (!project) {
                return res.json('404 Error');
            }
            
            if (project.user != req.user.id) {
                return res.json('500 Error');
            } else {
                let planner = await Planner.find({project: project._id});
                project = await Project.remove(
                    { _id: req.params.projectId }
                ).then(
                    planner = await Planner.remove(
                        { project: req.params.projectId })
                ).then(console.log("Successfully Deleted"));
                return res.json("Deleted");
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE Meeting
    // @route   PUT /planner/meeting/meetingId
    router.patch('/:projectId', ensureAuth, async (req, res) => {
        try {
            let project = await Project.findById(req.params.projectId);

            if (!project) {
                return res.json('404 Error');
            }

            if (project.user != req.user.id) {
                return res.json('404 Error');
            } else {
                project = await Project.updateOne(
                    { _id: req.params.projectId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(project);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    router.use('/:projectId/planner', plannerRoute);
    router.use('/:projectId/notes', notesRoute);

    return router;
}