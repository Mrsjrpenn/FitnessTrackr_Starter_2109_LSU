import React, { useState, useEffect } from "react";
import { getMyRoutines } from "../../Api/usersApi";

const MyRoutines = () => {
  const [myRoutinesList, setMyRoutinesList] = useState([]);

  useEffect(() => {
    const userRoutines = async () => {
      const myRoutines = await getMyRoutines();
      setMyRoutinesList(myRoutines);
    };
    userRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <h2>User: {routines}</h2>
      <h2>Name: {routines.name}</h2>
      <h3>goal: {routines.goal}</h3>
      <h1>Activities</h1>
      return(
      <div>
        <h2>Name:{activities.name}</h2>
        <p> Description: {activities.description}</p>
        <h2>Count: {activities.count}</h2>
        <h3>Duration:{activities.duration}</h3>
      </div>
      )
    </>
  );
};
export default MyRoutines;
