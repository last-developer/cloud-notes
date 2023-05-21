// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//     const [credentials, setCredentials] = useState({ name:'',email: '', password: '',cpassword:'' });
//     let navigate = useNavigate();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const {name,email,password}=credentials;
//         const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
//             method: 'POST', headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name,email, password })
//         });
//         const json = await response.json();
//         if (json.success) {
//             localStorage.setItem('token', json.authtoken);
//             navigate('/');
//         }
//         else {
//             alert("invalid credentials")
//         }
//     }
//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value })
//     }
//   return (
//     <>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <h2>Signup</h2>
//                 <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <input type="text" id="name" name="name" onChange={onChange} placeholder="Enter your name" required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input type="text" id="email" name="email" onChange={onChange}  placeholder="Enter your email" required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" name="password" onChange={onChange}  placeholder="Enter your password" required minLength={5}/>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="cpassword">Confirm Password</label>
//                     <input type="password" id="cpassword" name="cpassword" onChange={onChange}  placeholder="Enter confirm password" required minLength={5}/>
//                 </div>
//                 <button type="submit">Signup</button>
//             </form>
//         </>
//   )
// }

// export default Signup;
import React from 'react'

const Signup = () => {
    return (
        <div>
            I am signup
        </div>
    )
}

export default Signup
