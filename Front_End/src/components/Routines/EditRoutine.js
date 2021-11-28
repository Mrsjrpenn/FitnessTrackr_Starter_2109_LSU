import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { updateRoutines } from "../../Api/RoutinesApi";

const EditRoutine = ({myRoutinesList, token}) =>{
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [isPublic, setIsPublic] = useState(true);
  const {routineId, username} = useParams()
  const history = useHistory();
  
    useEffect(()=>{
      for(let routine of myRoutinesList){
        if(routine.id == routineId){
          setName(routine.name)
          setGoal(routine.goal)
          setIsPublic(routine.isPublic)
        }
      }
    },[])
    
  
    const handleEditRoutine = async (event) =>{
      try {
        event.preventDefault();
        updateRoutines(name, goal, isPublic, routineId, token)
        history.push(`/${username}/myroutines`)
      } catch (error) {
        console.error(error)
      }
    }


  return(
    <>
      <h1>Edit Routine</h1>

      <form onSubmit={handleEditRoutine}>
      <input
        type="text"
        minLength="1"
        value={name }
        onChange={(event)=> setName(event.target.value)}
        placeholder="Routine Name"></input>
        <input
        type="text"
        minLength="6"
        value={goal}
        onChange={(event)=> setGoal(event.target.value)}
        placeholder="Routine Goal">
        </input>
        <button type="submit">Submit Edit</button>
      </form>
    </>
  )
}

export default EditRoutine;