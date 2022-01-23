import React,{useState} from "react";
import Axios from 'axios';
import './App.css';

function App() {

const [firstnameReg,setfirstnameReg] = useState('')
const [lastnameReg,setlastnameReg] = useState('')

const [usernameReg,setusernameReg] = useState('')
const [passwordReg,setPasswordReg] = useState('')

const [username,setusername] = useState('')
const [password,setPassword] = useState('')

const [LoginStatus, setLoginStatus] = useState('');

const register = ()=>{
  Axios.post('http://localhost:5003/register', {
    firstname :firstnameReg,
    lastname :lastnameReg,
    username: usernameReg,
    password :passwordReg
  }).then((response)=>{

  });

};

const login = ()=>{
  Axios.post('http://localhost:5003/login', {
    username: username,
    password :password,
  }).then((response)=>{
    if(!response.data.message){

       window.location.href="http://localhost:3000/"
    }
    else
    {
      setLoginStatus(response.data.message);
     
    }
    
    
  });
};

  return (
    <div className="App">
      <div className ="registration">
        <h1 className="signup">Sign-Up</h1>
        <label>FirstName : </label>
        <input type="text"
        onChange={(e)=> {
          setfirstnameReg(e.target.value);
        }}
        /><br/>
        <label>LastName : </label>
        <input className="button" type="text"
        onChange={(e)=> {
          setlastnameReg(e.target.value);
        }}
        /><br/>
        <label>Username : </label>
        <input className="button" type="text"
          onChange={(e)=> {
            setusernameReg(e.target.value);
          }}
        /><br/>
        <label>Password : </label>
        <input className="button" type="text"
        onChange={(e)=> {
          setPasswordReg(e.target.value);
        }}
        /><br/>
        <button className="button" onClick={register}>Register</button>
      </div>


        <hr/>
      <div className ="login">
        <h1 className="signup">Login</h1>

        <label>Username : </label>
        <input  className="button1" type="text" placeholder="Username..."
         onChange={(e)=> {
          setusername(e.target.value);
        }}
        /><br/>

        <label>Password : </label>
        <input className="button"  type="text" placeholder="Password..."
         onChange={(e)=> {
          setPassword(e.target.value);
        }}
        /><br/>

        <button className="button" onClick={login }>Login</button>
      </div>  

      <h1>{LoginStatus}</h1>
    </div>
  );
}

export default App;
