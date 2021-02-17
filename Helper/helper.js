// Get ProjectId
function checkProjectId(projectId) {
    if (!projectId) {
        return null;
    } else {
        return projectId;
    }
}

module.exports = {

    // Get Planner ID
    getPlannerId: async function(projectId = null, userId = null) {
        const projectId_checked = checkProjectId(projectId);
        if (projectId_checked != null) {
            const plannerId = await require("../models/get_planner_id")(projectId, null);
            return plannerId;
        } else if (userId != null) {
            const plannerId = await require("../models/get_planner_id")(null, userId);
            return plannerId;
        }
    }
}