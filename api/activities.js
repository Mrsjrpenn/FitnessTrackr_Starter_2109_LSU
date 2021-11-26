const express = require("express");
const router = express.Router();
// const { requireUser } = require("../db/users");
const {
  createActivity,
  updateActivity,
  getAllActivities,
} = require("../db/activities");
const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines

// GET /api/activities

// POST /api/activities

// PATCH /api/activities/:activityId

router.use((req, res, next) => {
  console.log("Barry and I are making a request to the router");
  next();
});

// need to change the URL's
router.get("/:activityId/routines", async (req, res) => {
  const { activityId } = req.params;
  try {
    const routines = await getPublicRoutinesByActivity({
      activityId,
    });
    console.log("HERE ARE THE PUBLIC ROUTINES", routines);
    res.send(routines);
  } catch (error) {
    throw error;
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Calling");
    const response = await getAllActivities();
    res.send(response);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (req, res) => {
  // const { name, description } = req.body;
  // const activity = {};
  try {
    // activity.name = name;
    // activity.description = description;
    const newActivity = await createActivity(req);
    if (newActivity) {
      res.send(newActivity);
    }
  } catch (error) {
    throw error;
  }
});

// router.get("/:activityId/routines", async (req, res) => {
//   const { activityId } = req.params;
//   try {
//     const routines = await getPublicRoutinesByActivity({
//       activityId,
//     });
//     console.log("HERE ARE THE PUBLIC ROUTINES", routines);
//     res.send(routines);
//   } catch (error) {
//     throw error;
//   }
// });

router.patch("/:activityId", async (req, res) => {
  const { activityId } = req.params;
  try {
    const updatedActivities = await updateActivity({ activityId });
    if (updatedActivities) {
      res.send(updatedActivities);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
