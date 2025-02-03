import React, { useState } from 'react';
import "./signup.css"
import axios from 'axios';
import { useNavigate } from 'react-router';
const Signup = () => {
    const [Name,setName] = useState("")
    const [UserName,setUserName] = useState("")
    const [Email,SetEmail] = useState("")
    const [Password,SetPassword] = useState("")
    const [confirmPassword,SetconfirmPassword] = useState("")
         
    const histroy = useNavigate()
    
        const Submit = async()=>{
            event.preventDefault
            try{
                await axios.post("http://localhost:3001/api/signup",{
                    UserName,
                    Name,
                    Email,
                    Password
                }, {
                    timeout: 5000  // Increase timeout (in ms)
                }).then(res=>{
                    if(res.data = "created"){
                        histroy("/login")
                    }
                });
                console.log("Signup successful");
            }catch(e){
                console.log("loginnup error",e)
            }
        }
        
       
    return (
        <div className='login-container'>
            <form className="login-form">
            <div className="formlogindiv">

                 <label className='Login-Label'>Enter Your Name</label>
                 <input placeholder='Name' type='text' className='Login-input' value={Name} onChange={(e)=>setName(e.target.value)} />


                 <label className='Login-Label'>Enter   Username</label>
                 <input placeholder='UserName' type='text' className='Login-input' value={UserName} onChange={(e)=>setUserName(e.target.value)} />


                 <label className='Login-Label' >Email</label>
                 <input placeholder='Email' className='Login-input'  type='text' value={Email} onChange={(e)=>SetEmail(e.target.value)} />
                 <label className='Login-Label'>Password</label>
                 <input placeholder='Password' className='Login-input' type='password'  value={Password}
                        onChange={(e) => SetPassword(e.target.value)} />
                 <label className='Login-Label'> Confirm Password</label>
                 <input placeholder='Password' className='Login-input' type='password'   value={confirmPassword}
                        onChange={(e) => SetconfirmPassword(e.target.value)} />
                        
            </div>
            <div>
                <button className='Login-BTN' type="button" onClick={Submit}>submit</button>
            </div>
            </form>
        </div>
    );
}

export default Signup;
