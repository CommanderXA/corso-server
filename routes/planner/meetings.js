module.exports = function (router, ensureAuth) {

    // Import Model
    const Meeting = require("../../models/planner/Meeting");

    // @desc    Get Meetings
    // @route   GET /planner/meetings
    router.get('/meeting', ensureAuth, async (req, res) => {
        try {
            const meetings = await Meeting.find({ user: req.user.id }).sort({ createdAt: 'desc' });
            res.json(meetings);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save Meeting
    // @route   GET /planner/meeting
    router.post('/meeting', ensureAuth, async (req, res) => {
        try {
            req.body.user = req.user.id
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

            if (!meeting) {
                return res.json('404 Error');
            }

            if (meeting.user != req.user.id) {
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
            
            if (!meeting) {
                return res.json('404 Error');
            }
            
            if (meeting.user != req.user.id) {
                return res.json('500 Error');
            } else {
                meeting = await Meeting.remove(
                    { _id: req.params.meetingId }
                );
                return res.json(Meeting);
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
            
            if (!meeting) {
                return res.json('404 Error');
            }

            if (meeting.user != req.user.id) {
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