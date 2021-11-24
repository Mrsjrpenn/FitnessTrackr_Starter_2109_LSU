import React, { useState, useEffect } from "react";
import { getActivities } from "../../Api/activitiesApi";
import { createActivities } from "../../Api/activitiesApi";

const Activities = ({isLoggedIn, token}) => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")

  useEffect(() => {
    const newActivities = async () => {
      const activities = await getActivities();
      setActivitiesList(activities);
    };
    newActivities();
  },[]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      await createActivities(token, name, description)
    }

  return (
    <>
      { isLoggedIn ?
      <>
      <h3>Create New Activity</h3>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        minLength="1"
        value={name}
        onChange={(event)=> setName(event.target.value)}
        placeholder="Activity Name">
        </input>
        <input
        type="text"
        minLength="6"
        value={description}
        onChange={(event)=> setDescription(event.target.value)}
        placeholder="Goal">
        </input>
        <button>Submit</button>
      </form>
      </> : null
      }
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
