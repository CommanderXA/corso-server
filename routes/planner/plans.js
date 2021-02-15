module.exports = function (router, ensureAuth) {

    // Import Model
    const Plan = require("../../models/planner/Plan");

    // @desc    Get plan
    // @route   GET /planner/plan
    router.get('/plan', ensureAuth, async (req, res) => {
        try {
            const plans = await Plan.find({ user: req.user.id }).sort({ createdAt: 'desc' });
            res.json(plans);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Save plan
    // @route   GET /planner/plan
    router.post('/plan', ensureAuth, async (req, res) => {
        try {
            req.body.user = req.user.id
            const plan = await Plan.create(req.body);
            res.json(plan);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific plan
    // @route   GET /planner/plan/:planId
    router.get('/plan/:planId', ensureAuth, async (req, res) => {
        try {
            const plan = await Plan.findById(req.params.planId);

            if (!plan) {
                return res.json('404 Error');
            }

            if (plan.user != req.user.id) {
                res.json('404 Error');
            } else {
                res.json(plan);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE plan
    // @route   DELETE /planner/plan/:planId
    router.delete('/plan/:planId', ensureAuth, async (req, res) => {
        try {
            let plan = await Plan.findById(req.params.planId);
            
            if (!plan) {
                return res.json('404 Error');
            }
            
            if (plan.user != req.user.id) {
                return res.json('500 Error');
            } else {
                plan = await Plan.remove(
                    { _id: req.params.planId }
                );
                return res.json(plan);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE plan
    // @route   PUT /planner/plan/planId
    router.patch('/plan/:planId', ensureAuth, async (req, res) => {
        try {
            let plan = await Plan.findById(req.params.planId);
            
            if (!plan) {
                return res.json('404 Error');
            }

            if (plan.user != req.user.id) {
                return res.json('404 Error');
            } else {
                plan = await Plan.updateOne(
                    { _id: req.params.planId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(plan);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });
}