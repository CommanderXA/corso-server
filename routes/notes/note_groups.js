module.exports = function (router, ensureAuth) {

    // Import Model
    const NoteGroup = require("../../models/notes/NotesGroup");

    // @desc    Get noteGroups
    // @route   GET /planner/noteGroups
    router.get('/group', ensureAuth, async (req, res) => {
        try {
            const noteGroups = await NoteGroup.find({ user: req.user.id }).sort({ createdAt: 'desc' });
            res.json(noteGroups);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save noteGroup
    // @route   GET /planner/noteGroup
    router.post('/group', ensureAuth, async (req, res) => {
        try {
            req.body.user = req.user.id
            const noteGroup = await NoteGroup.create(req.body);
            res.json(noteGroup);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific noteGroup
    // @route   GET /planner/noteGroup/:noteGroupId
    router.get('/group/:groupId', ensureAuth, async (req, res) => {
        try {
            const noteGroup = await NoteGroup.findById(req.params.groupId);

            if (!noteGroup) {
                return res.json('404 Error');
            }

            if (noteGroup.user != req.user.id) {
                res.json('404 Error');
            } else {
                res.json(noteGroup);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE noteGroup
    // @route   DELETE /planner/noteGroup/:noteGroupId
    router.delete('/group/:groupId', ensureAuth, async (req, res) => {
        try {
            let noteGroup = await NoteGroup.findById(req.params.groupId);
            
            if (!noteGroup) {
                return res.json('404 Error');
            }
            
            if (noteGroup.user != req.user.id) {
                return res.json('500 Error');
            } else {
                noteGroup = await NoteGroup.remove(
                    { _id: req.params.groupId }
                );
                return res.json(noteGroup);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE noteGroup
    // @route   PUT /planner/noteGroup/noteGroupId
    router.patch('/group/:groupId', ensureAuth, async (req, res) => {
        try {
            let noteGroup = await NoteGroup.findById(req.params.groupId);
            
            if (!noteGroup) {
                return res.json('404 Error');
            }

            if (noteGroup.user != req.user.id) {
                return res.json('404 Error');
            } else {
                noteGroup = await NoteGroup.updateOne(
                    { _id: req.params.groupId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(noteGroup);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });
}