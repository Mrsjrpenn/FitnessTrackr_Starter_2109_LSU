const client = require("./client");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    SELECT * FROM routine_activities
    WHERE routine_activities.id = $1
    `,
      [id]
    );
    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    //console.log("this is the routineActivities", routineActivity);

    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
