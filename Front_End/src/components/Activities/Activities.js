import React, { useState, useEffect } from "react";
import { getActivities } from "../../Api/activitiesApi";

const Activities = () => {
  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    const newActivities = async () => {
      const activities = await getActivities();
      setActivitiesList(activities);
    };
    newActivities();
  });

  return (
    <>
      <h1>Activities</h1>
      {activitiesList.map((activity) => {
        return (
          <div>
            <p>Name {activity.name}</p>
            <p>Description {activity.description}</p>
          </div>
        );
      })}
    </>
  );
};
export default Activities;
