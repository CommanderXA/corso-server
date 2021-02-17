module.exports = async function (projectId = null, userId = null) {
    
    // Import Model
    const Planner = require("./Planner");
    
    if (projectId != null) {
        const planner = await Planner.find({ project: projectId });
        console.log(planner);
        return planner[0]._id;
    } else if (userId != null) {
        const planner = await Planner.find({ user: userId });
        return planner[0]._id;
    }
}