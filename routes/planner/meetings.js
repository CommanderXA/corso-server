module.exports = function (router, ensureAuth) {

    // Import Model
    const Meeting = require("../../models/planner/Meeting");

    // Get ProjectId
    function checkProjectId(projectId) {
        if (!projectId) {
            return null;
        } else {
            return projectId;
        }
    }

    // Get Planner ID
    async function getPlannerId(projectId = null, userId = null) {
        const projectId_checked = checkProjectId(projectId);
        if (projectId_checked != null) {
            const plannerId = await require("../../models/get_planner_id")(projectId, null);
            console.log(plannerId);
            return plannerId;
        } else if (userId != null) {
            const plannerId = await require("../../models/get_planner_id")(null, userId);
            return plannerId;
        }
    }

    // @desc    Get Meetings
    // @route   GET /planner/meetings
    router.get('/meeting', ensureAuth, async (req, res) => {
        try {
            const plannerId = await getPlannerId(req.params.projectId, req.user.id);
            console.log(plannerId);
            const meetings = await Meeting.find({ planner: plannerId }).sort({ createdAt: 'desc' });
            res.json(meetings);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save Meeting
    // @route   GET /planner/meeting
    router.post('/meeting', ensureAuth, async (req, res) => {
        try {
            const plannerId = await getPlannerId(null, req.user.id);           
            req.body.planner = plannerId;
            const meeting = await Meeting.create(req.body);
            res.json(meeting);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific meeting
    // @route   GET /planner/meeting/:meetingId
    router.get('/meeting/:meetingId', ensureAuth, async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.meetingId);
            const plannerId = await getPlannerId(null, req.user.id);

            if (!meeting) {
                return res.json('404 Error');
            }

            if (meeting.planner != plannerId.toString()) {
                res.json('404 Error');
            } else {
                res.json(meeting);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE Meeting
    // @route   DELETE /planner/meeting/:meetingId
    router.delete('/meeting/:meetingId', ensureAuth, async (req, res) => {
        try {
            let meeting = await Meeting.findById(req.params.meetingId);
            const plannerId = await getPlannerId(null, req.user.id);

            if (!meeting) {
                return res.json('404 Error');
            }
            
            if (meeting.planner != plannerId.toString()) {
                return res.json('500 Error');
            } else {
                meeting = await Meeting.remove(
                    { _id: req.params.meetingId }
                );
                return res.json("Deleted");
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE Meeting
    // @route   PUT /planner/meeting/meetingId
    router.patch('/meeting/:meetingId', ensureAuth, async (req, res) => {
        try {
            let meeting = await Meeting.findById(req.params.meetingId);
            const plannerId = await getPlannerId(null, req.user.id);

            if (!meeting) {
                return res.json('404 Error');
            }

            if (meeting.planner != plannerId.toString()) {
                return res.json('404 Error');
            } else {
                meeting = await Meeting.updateOne(
                    { _id: req.params.meetingId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(meeting);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });
}