const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function getActivities(BASE_URL) {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
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

export async function createActivities(token, name, description, BASE_URL) {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateActivities(
  name,
  description,
  activitiesId,
  BASE_URL
) {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activitiesId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
