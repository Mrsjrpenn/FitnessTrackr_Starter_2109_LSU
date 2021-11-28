import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createRoutines } from "../../Api/RoutinesApi";
import { getMyRoutines } from "../../Api/usersApi";
import AddActivityToRoutine from "./AddActivityToRoutine";

const MyRoutines = ({token, myRoutinesList, setMyRoutinesList}) => {
  const {username} = useParams();
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [activityForm, setActivityForm] = useState(false);
  

  useEffect(() => {
    const userRoutines = async () => {
      try{
      const myRoutines = await getMyRoutines(token, username);
      setMyRoutinesList(myRoutines);
      
      } catch(error) {
        console.error(error);
      }
    };
    userRoutines();
  }, [token, username, activityForm]);

  const handleCreateRoutine = async (event) =>{
    event.preventDefault();
    await createRoutines(token, routineName, routineGoal, isPublic)
  }

  const handlePublic = ()=>{
    setIsPublic(!isPublic)
  }

  const handleActivityForm = () =>{
    setActivityForm(true)
  }

  return (
    <>
      <h1>Routines</h1>
        { myRoutinesList.map((routines)=>{
          const routineId = routines.id

          return(
          <div key={routines.id} >
           <h2>Name: {routines.name}</h2>
           <h3>goal: {routines.goal}</h3>
           <h3>Public: {routines.isPublic ? "Yes" : "No" } </h3>
           <Link to={`/${username}/myroutines/${routines.id}/edit`} >Edit</Link>
           <h1>Activities</h1>
            {routines.activities.map((activities)=>{
              return(
              <div>
              <h2>Name:{activities.name}</h2>
              <p> Description: {activities.description}</p>
              <h2>Count: {activities.count}</h2>
              <h3>Duration:{activities.duration}</h3>
              </div>  
            )})}
            {activityForm ? 
              <AddActivityToRoutine 
                setActivityForm={setActivityForm}
                routineId={routineId} /> : 
              <button type="button" onClick={handleActivityForm} >Add Activity</button>
              }
          </div>
        )})}

      <h3>Create Routine</h3>
      <form onSubmit={handleCreateRoutine}>
        <input
        type="text"
        minLength="1"
        value={routineName}
        onChange={(event)=> setRoutineName(event.target.value)}
        placeholder="Routine Name"></input>
        <input
        type="text"
        minLength="6"
        value={routineGoal}
        onChange={(event)=> setRoutineGoal(event.target.value)}
        placeholder="Routine Goal">
        </input>
        <label>
          Public?
          <input 
            type="checkbox" 
            checked={isPublic} 
            onChange={handlePublic}>
          </input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default MyRoutines;
