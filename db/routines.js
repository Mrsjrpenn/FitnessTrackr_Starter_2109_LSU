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
      SELECT *
      FROM routines;
    `);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getAllPublicRoutines() {}

async function getPublicRoutinesByActivity({ id }) {}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  console.log("inside createRoutine function");
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
    console.log("this is the routine", routine);
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
