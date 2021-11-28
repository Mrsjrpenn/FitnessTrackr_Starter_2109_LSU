import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../../Api/RoutinesApi";

const PublicRoutines = () => {
  const [routinesList, setRoutinesList] = useState([]);

  useEffect(() => {

    const newRoutines = async () => {
      const routines = await getPublicRoutines();
      setRoutinesList(routines);
    };
    newRoutines();

  }, []);
  return (
    <>
      <h1>Public Routines</h1>
      {routinesList.map((routines) => (
        <div key={routines.id}>
          <h2>Routine</h2>
          <h2>User: {routines.creatorName}</h2>
          <h2>Name: {routines.name}</h2>
          <h3>goal: {routines.goal}</h3>
          <h1>Activities</h1>
          {routines.activities.map((activities) => {
            return (
              <div>
                <h2>Name: {activities.name}</h2>
                <p>Description: {activities.description}</p>
                <h2>Count: {activities.count}</h2>
                <h3>Duration: {activities.duration}</h3>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
export default PublicRoutines;
