import React, {useState} from "react";
import { registerUser } from "../../Api/usersApi";
import { useHistory } from "react-router";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ confirmPassword, setConfirmPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true)
  const history = useHistory();


  const handleSubmit = async (event) =>{
    event.preventDefault();
    if(password === confirmPassword){
      setDoPasswordsMatch(true);
      const result = await registerUser(username, password)
      console.log("HERE IS REGISTER RESPONSE", result)
      localStorage.setItem('token', result.token)
      history.push('/')
    } else {
      setDoPasswordsMatch(false)
    }
  }

  return(
    <div>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          type="text"
          minLength = "6"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username">
        </input>
        <input 
          type="password" 
          minLength = "8"
          value={password}
          onChange={(event)=>setPassword(event.target.value)}
          placeholder="Password">
        </input>
        <input 
          type="password"
          value={confirmPassword}
          onChange={(event)=>setConfirmPassword(event.target.value)}
          placeholder="Confirm Password">
        </input>
        <button type="submit">Submit</button>
      </form>
      {
        doPasswordsMatch ? null : <h1>Passwords Do Not Match!</h1>
      }
    </div>
  )
}

export default RegisterForm;