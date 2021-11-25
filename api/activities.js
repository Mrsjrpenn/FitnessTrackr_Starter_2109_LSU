const express = require("express");
const router = express.Router();
// const { requireUser } = require("../db/users");
const {
  createActivities,
  updateActivities,
  getAllActivities,
} = require("../db/activities");

// GET /api/activities/:activityId/routines

// GET /api/activities

// POST /api/activities

// PATCH /api/activities/:activityId

router.use((req, res, next) => {
  console.log("Barry and I are making a request to the router");
  next();
});

router.get("/activities", async (req, res) => {
  try {
    console.log("Calling");
    const response = await getAllActivities();
    console.log("HERE IS THE RESPONSE", response);
    res.send(response);
  } catch (error) {
    throw error;
  }
});
router.post("/api/activities", async (req, res) => {
  const { name, description } = req.body;
  const activity = {};
  try {
    activity.name = name;
    activity.description = description;
    const newActivity = await createActivities(activity);
    if (newActivity) {
      res.send(newActivity);
    }
  } catch (error) {
    throw error;
  }
});
router.patch("/api/activities/:activityId", async (req, res) => {
  const { activityId } = req.params;
  try {
    const updatedActivities = await updateActivities({ activityId });
    if (updatedActivities) {
      res.send(updatedActivities);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
