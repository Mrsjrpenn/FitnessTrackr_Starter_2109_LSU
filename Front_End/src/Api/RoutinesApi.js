import { response } from "express";

const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function getPublicRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRoutines(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/routines/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoutines(token, name, goal, isPublic) {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateRoutines(name, goal, isPublic, routineId, token) {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postActivityToRoutine(routineId, activityId, count, duration) {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        activityId,
        count,
        duration
      })
    })
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error)
  }
}
