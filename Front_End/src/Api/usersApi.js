const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getMyRoutines(token, username) {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    let result;
    try{
      result = await response.json();
    } catch (error){
      return []
    } 
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    const result = await response.json();
    if( result.error){
      console.error(result)
      return
    }
    return result
  } catch (error) {
    console.error(error)
  }
}
