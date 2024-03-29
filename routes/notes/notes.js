module.exports = function (router, ensureAuth) {

    // Import Model
    const Note = require("../../models/notes/Note");

    // @desc    Get notes
    // @route   GET /notes/note
    router.get('/', ensureAuth, async (req, res) => {
        try {
            const notes = await Note.find({ group: req.params.groupId }).sort({ createdAt: 'desc' });
            res.json(notes);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save note
    // @route   GET /notes/note
    router.post('/', ensureAuth, async (req, res) => {
        try {
            req.body.user = req.user.id
            const note = await Note.create(req.body);
            res.json(note);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific note
    // @route   GET /notes/note/:noteId
    router.get('/note/:noteId', ensureAuth, async (req, res) => {
        try {
            const note = await Note.findById(req.params.noteId);

            if (!note) {
                return res.json('404 Error');
            }

            if (note.user != req.user.id) {
                res.json('404 Error');
            } else {
                res.json(note);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE note
    // @route   DELETE /notes/note/:noteId
    router.delete('/note/:noteId', ensureAuth, async (req, res) => {
        try {
            let note = await Note.findById(req.params.noteId);
            
            if (!note) {
                return res.json('404 Error');
            }
            
            if (note.user != req.user.id) {
                return res.json('500 Error');
            } else {
                note = await Note.remove(
                    { _id: req.params.noteId }
                );
                return res.json(note);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE note
    // @route   PUT /notes/note/noteId
    router.patch('/note/:noteId', ensureAuth, async (req, res) => {
        try {
            let note = await Note.findById(req.params.noteId);
            
            if (!note) {
                return res.json('404 Error');
            }

            if (note.user != req.user.id) {
                return res.json('404 Error');
            } else {
                note = await Note.updateOne(
                    { _id: req.params.noteId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(note);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });
}