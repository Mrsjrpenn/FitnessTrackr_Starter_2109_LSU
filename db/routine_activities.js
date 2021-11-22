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

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows} = await client.query(`
    SELECT *
    FROM routine_activities
    WHERE routine_activities."routineId" = $1
    `,[id])
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
    UPDATE routine_activities
    SET ${setString}
    WHERE id= ${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {rows: [deletedRoutine]} = await client.query(`
    DELETE FROM routine_activities
    WHERE id =$1
    RETURNING *
   `,[id]);

    return deletedRoutine
  } catch (error) {
    console.error(error);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {rows: [routineActivity] } = await client.query(`
    SELECT *
    FROM routine_activities
    JOIN routines
    ON routine_activities."routineId" = routines.id
    WHERE routine_activities.id = $1
   `,[routineActivityId]);

    if( routineActivity.creatorId === userId){
      return true
    }
    return false
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
