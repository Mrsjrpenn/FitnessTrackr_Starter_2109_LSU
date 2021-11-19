const client = require("./client");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT *
    FROM routines
    WHERE id =$1
    `,
      [id]
    );
    return routine;
  } catch (error) {
    console.error(error);
  }
}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT 
      routines.id as "routineId",
      routines."isPublic",
      routines.name,
      routines.goal,
      routines."creatorId",
      users.username as "creatorName",
      routine_activities.id as "routineActivityId",
      routine_activities.duration,
      routine_activities.count,
      activities.id as "activityId",
      activities.name as "activityName",
      activities.description as "activityDescription"
    FROM routines
    LEFT JOIN users
    ON routines."creatorId" = users.id
    LEFT JOIN routine_activities
    ON routine_activities."routineId" = routines.id
    LEFT JOIN activities
    ON routine_activities."activityId" = activities.id;
    `);
    
    const fixedRoutines = {};

    const getActivityFromRow = (row) => {
      return {
        id: row.activityId,
        name: row.activityName,
        description: row.activityDescription,
        duration: row.duration,
        count: row.count,
        routineId: row.routineId,
        routineActivityId: row.routineActivityId
      }
    }


    for(const row of rows) {
      if(fixedRoutines[row.routineId]){
        fixedRoutines[row.routineId].activities.push(getActivityFromRow(row))
      } else {
        fixedRoutines[row.routineId] ={
          id: row.routineId,
          isPublic: row.isPublic,
          name: row.name,
          goal: row.goal,
          creatorId: row.creatorId,
          creatorName: row.creatorName,
          activities: row.activityId ? [getActivityFromRow(row)] : []
        }
      }
    }

    const routines = Object.values(fixedRoutines)

    return routines;
  } catch (error) {
    console.error(error);
  }
}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getAllPublicRoutines() {}

async function getPublicRoutinesByActivity({ id }) {}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    console.error(error);
  }
}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
