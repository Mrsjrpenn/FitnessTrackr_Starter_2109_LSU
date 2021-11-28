import { useState, useEffect } from "react";
import { getActivities } from "../../Api/activitiesApi";
import { postActivityToRoutine } from "../../Api/RoutinesApi";

const AddActivityToRoutine = ({setActivityForm, routineId}) =>{
  const [activitiesList, setActivitiesList] = useState([])
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [activityId, setActivityId] = useState("")
  

  useEffect(()=>{
    (async ()=>{
      const activities = await getActivities();
      setActivitiesList(activities)
    })()
  },[])
  
  const handleCancel = () =>{
    setActivityForm(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postActivityToRoutine(routineId, activityId, count, duration)
    setActivityForm(false)
  }

  console.log( count, duration, activityId)

  return (
    <>
      <form onSubmit={handleSubmit} >
        <label >Choose A Activity:</label>
        <select id="activity-select">
          <option value="">Choose an Activity</option>
          {activitiesList.map((activity)=>{
            const tempActivityId = activity.id

            return(
              <option 
                value={tempActivityId} 
                onClick={(event)=>{setActivityId(event.target.value)}}
                >
                {activity.name}</option>
            )
          })}
        </select>
        <input
          type="number"
          value={count}
          onChange={(event)=>{ setCount(event.target.value)}}
          placeholder="Count">
        </input>
        <input
          type="number"
          value={duration}
          onChange={(event)=>{ setDuration(event.target.value)}}
          placeholder="Duration">
        </input>
        <button type="submit" onClick={handleSubmit} >Submit</button>
      </form>
      <button type="button" onClick={handleCancel} >Cancel</button>
    </>
  )
}

export default AddActivityToRoutine;