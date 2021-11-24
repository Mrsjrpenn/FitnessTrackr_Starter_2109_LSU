import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../../Api/RoutinesApi";

const PublicRoutines = () => {
  const [routinesList, setRoutinesList] = useState([]);

  useEffect(() => {
    // fetch("https://fitnesstrac-kr.herokuapp.com/api/routines")
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     setRoutinesList(result);
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });

    const newRoutines = async () => {
      const routines = await getPublicRoutines();
      setRoutinesList(routines);
    };
    newRoutines();

    // (async ()=>{
    //   const routines = await getPublicRoutines()
    //   setRoutinesList(routines)
    // })()
  }, []);
  console.log("HERE IS ROUTINES LIST", routinesList);
  return (
    <>
      {routinesList.map((routines) => (
        <div key={routines.id}>
          <h1>Routines</h1>
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
