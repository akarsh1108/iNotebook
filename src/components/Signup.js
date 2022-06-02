import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    let navigate=useNavigate();
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
           
            method: 'POST', 
              headers: {
              'Content-Type': 'application/json',
            },   
            body: JSON.stringify({name,email,password})   
          });
          const json = await response.json()
          console.log(json);
          
          if(json.success){
              localStorage.setItem('token',json.authtoken);
              navigate("/");
              props.showAlert("Account Created Successfully","success")
          }
          else{
           props.showAlert("Invalid Credentials","danger")
          }
    }
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})  
    const onChange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-2">
        <h1>Create an account to use iNotebook</h1>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange}/>
    </div>
    <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default Signup