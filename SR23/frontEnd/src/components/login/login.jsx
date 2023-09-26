import React, { useState } from "react";
import loginImg from "../../login.svg";
import ProtectedRoutes from "../../pages/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import styles from "./style.scss"
import Home from "../../pages/home";
import axios from "axios";
//import { authenticate } from "../ProtectedRoutes"; // Import the authenticate function


const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleForgotPasswordClick = () => {
    props.onReturnToForgot();
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
  
    // Perform your authentication logic here
    try {
      const response = await axios.post("http://127.0.0.1:5000/check", {
        email: state.email,
        password: state.password,
      });
  
      if (response.data.message === "success") {
        //onLogin(); // Call the onLogin prop to set isAuthenticated to true
        navigate("/home"); // Redirect to the home page
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const HandleLoginClick = async () => {
  //   const { email, password } = state;
  //   return (email, password);
  // };

  
    // try {
    //   const response = await axios.post("http://127.0.0.1:5000/check", data); // Adjust the API endpoint
    //   if (response.data.message === "success") {
    //     console.log("Authentication successful");
    //     navigate("/home"); // Redirect to the home page on successful login
    //   } else {
    //     console.log("Authentication failed");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  
  
    // try {
    //   const result = await authenticate(data); // Use the imported authenticate function
    //   console.log("Authentication result:", result);
    //   if (result) {
    //     navigate("/home");
    //   }
    // } catch (error) {
    //   console.error("Authentication error:", error);
    // }
 


  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>

        <div className="form">
          <form onSubmit={handleLoginFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={state.password}
                onChange={handleInputChange}
                required
              />
            </div>
          

          <div className="footer">
            <button
              type="submit"
              className="btn"
            >
              Login
            </button>
            <div
              className="forgot-password"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password
            </div>
          </div>
          </form> 
        </div>
      </div>
    </div>
  );
};


export default Login;



// import React from "react";
// import loginImg from "../../login.svg";
// import ProtectedRoutes from "../ProtectedRoutes";
// import { Outlet, useNavigate} from "react-router-dom";
// import Home from "../../pages/home";

// export class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//   };
// }

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleForgotPasswordClick = () => {
//     this.props.onReturnToForgot();
//   };

//   handleLoginClick = async () => {
//     const { email, password } = this.state;
//     const data = {
//       email: email,
//       password: password,
//     };
 
//     console.log('look here', data);
    
//     // Call the useAuth function from ProtectedRoutes
//     try {
//       const result = await ProtectedRoutes.useAuth(data);
//       console.log('Authentication result:', result);
//       if (result)
//         this.props.handleHomePage;

//     } catch (error) {
//       console.error('Authentication error:', error);
//     }
//   };



//   render() {
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <div className="header">Login</div>
//         <div className="content">
//           <div className="image">
//             <img src={loginImg} />
//           </div>
          
//           <div className="form">
//           <form>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input 
//               type="text"
//               name="email" 
//               placeholder="email" 
//               value = {this.state.email}
//               onChange = {this.handleInputChange}
//               required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input 
//               type="password" 
//               name="password" 
//               placeholder="password" 
//               value = {this.state.password}
//               onChange = {this.handleInputChange}
//               required
              
//               />
//             </div>

//             <div className="footer">
//           <button 
//           type="button" 
//           className="btn"
//           onClick={this.handleLoginClick}
//           >
//             Login

//           </button>
          

//           <div 
//           className="forgot-password" 
//           onClick={this.handleForgotPasswordClick}>
//             Forgot Password
//           </div>

         
//         </div>


//           </form>
//           </div>
//         </div>

//       </div>
     
//     );
//   }
// }

