const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api"

export async function getPublicRoutines(){
  try {
    const response = await fetch(`${BASE_URL}/routines`,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error)
  }
}

