const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function updateRoutine_Activities(
  routine_activitiesId,
  count,
  duration
) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/routine_activities/${routine_activitiesId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateRoutine_Activities(routine_activitiesId) {
  try {
    const response = await fetch(
      `${BASE_URL}/routine_activities/${routine_activitiesId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
