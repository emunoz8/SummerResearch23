import React, { useState, useRef, useEffect } from "react";
import "./log.scss";
import Register from "../components/login/register";
import Login from "../components/login/login";
import Forgot from "../components/login/forgot";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = (props) => {
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogginActive, setIsLogginActive] = useState(false);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [isAbleToLogin, setIsAbleToLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const rightSideRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();





  const handleForgotPasswordReturn = () => {
    setIsForgotPasswordActive(false);
  };

  const handleLoginReturn = () => {
    setIsForgotPasswordActive(true);
  };

  const handleReturnToLogin = () => {
    setIsAbleToLogin(true);
  };

  const onLogin = async (email, password) => {
    // Perform your login logic here
    const data =
    {   email: email,
        password: password
    };  
    try { 
      const response = await axios.post("http://127.0.0.1:5000/check", data);   
      setIsAuthenticated(response.data.isAuthenticated);
      setIsLoading(false);
      setIsAuthenticated(true);

      if (response.data.isAuthenticated) {
        navigate("/home");
      }
    }
      catch (error) { 
        console.error("Authentication error:", error);
        setIsLoading(false);
      }
    }





  const handleLogin = async (email, password) => {
    // // Perform your login logic here
    // const data = 
    // { email: email,
    //    password: password
    // };
    // try {
    //   const response = await axios.post("http://127.0.0.1:5000/check", data);
    //   setIsAuthenticated(response.data.isAuthenticated);
    //   setIsLoading(false);
    //   setIsAuthenticated(true);
    //   console.log("Logging in with:", email, password);
    // // You can navigate to a protected route here if login is successful
    //   //navigate("/protected");
    // } catch (error) {
    //   console.error("Authentication error:", error);
    //   setIsLoading(false);
    // }
    
  };

  useEffect(() => {
    changeState();  
  }, []);

  const changeState = () => {
    const currentRef = rightSideRef.current;

    if (isLogginActive) {
      currentRef.classList.remove("right");
      currentRef.classList.add("left");
    } else {
      currentRef.classList.remove("left");
      currentRef.classList.add("right");
    }

    setIsLogginActive(!isLogginActive);
    setIsForgotPasswordActive(false);
  };

  const  current = isLogginActive ? "Register" : "Login";
  console.log("current", current);


  return (
    
    <div className="App">
      <div className="background-image">
        <div className="login">
      
            <div className="container" ref={containerRef}>
              {!isAbleToLogin && isForgotPasswordActive && (
                <Forgot
                  onReturnToLogin={handleForgotPasswordReturn}
                  setForgotPasswordActive={(isActive) =>
                    setIsForgotPasswordActive(isActive)
                  }
                  containerRef={containerRef} // Use the containerRef directly

                />
              )}

              {!isAbleToLogin && isLogginActive && !isForgotPasswordActive && (
                <Login
                  onReturnToForgot={handleLoginReturn}
                  onLoginSuccess={handleReturnToLogin}
                  onLoginFail={handleLoginReturn}
                  handleHomePage={handleLogin(email, password)}
                  setForgotPasswordActive={(isActive) =>
                    setIsForgotPasswordActive(isActive)
                  }
                  containerRef={containerRef} // Use the containerRef directly

                />
              )}
              {!isAbleToLogin && !isLogginActive && !isForgotPasswordActive && (
                <Register containerRef={(ref) => (current = ref)} />
              )}
            </div>

            <RightSide
              current= {current}
              containerRef={rightSideRef}
              onClick={changeState}
            />
          



        </div>
      </div>
    </div>
  );
};
// RightSide component
const RightSide = (props) => {
  
  return (
    <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginPage;



// import React from "react";
// import "./log.scss";
// import Register from "../components/login/register";
// import Login from "../components/login/login";
// import Forgot from "../components/login/forgot";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// class Log extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogginActive: true,
//       isForgotPasswordActive: false,
//       isAbleToLogin: false,
//     };
//   }


//   componentDidMount() {
//     this.rightSide.classList.add("right");
//   }

//   handleForgotPasswordReturn = () => {
//     this.setState({ isForgotPasswordActive: false });
//   };

//   handleLoginReturn = () => {
//     this.setState({ isForgotPasswordActive: true });
//   };

//   handleReturnToLogin =() => {
//     this.setState({ isAbleToLogin: true });
    
//   }

//   handleHomePage = () => {  
//     const navigate = useNavigate();
//     navigate("/home");
//   }

//   //changes from right to left, left to right
//    changeState() {
//     const { isLogginActive } = this.state;
    
//     if (isLogginActive) {
//       this.rightSide.classList.remove("right");
//       this.rightSide.classList.add("left");
//     } else {
//       this.rightSide.classList.remove("left");
//       this.rightSide.classList.add("right");
//     }

//     this.setState((prevState) => ({
//       isLogginActive: !prevState.isLogginActive,
//       isForgotPasswordActive: false,

//     }));
//   }

//   render() {
//     const { isLogginActive } = this.state;
//     const { isForgotPasswordActive } = this.state;
//     const { isAbleToLogin } = this.state;

//     const current = isLogginActive ? "Register" : "Login";

//     return (
//       <div className="App">
//         <div className="login">

//           {!isAbleToLogin && (
//           <div className="container" ref={(ref) => (this.container = ref)}>
            
//             {!isAbleToLogin && isForgotPasswordActive && (
//               <Forgot
//                 onReturnToLogin={this.handleForgotPasswordReturn}
//                 setForgotPasswordActive={(isActive) => this.setState({ isForgotPasswordActive: isActive })}
//                 containerRef={(ref) => (this.current = ref)}
//               />
//             )}

//             {!isAbleToLogin && isLogginActive && !isForgotPasswordActive && (
//               <Login
//                 onReturnToForgot={this.handleLoginReturn}
//                 onLoginSuccess={this.handleReturnToLogin}
//                 onLoginFail={this.handleLoginReturn}
//                 handleHomePage = {this.handleHomePage}
//                 setForgotPasswordActive={(isActive) => this.setState({ isForgotPasswordActive: isActive })}
//                 containerRef={(ref) => (this.current = ref)} 
              
//                 />

//             )}
//             {!isAbleToLogin && !isLogginActive && !isForgotPasswordActive && (
//               <Register containerRef={(ref) => (this.current = ref)} />
//             )}


//           </div>
//           )}

//           {!isAbleToLogin && (
//           <RightSide
//             current={current}
//             containerRef={(ref) => (this.rightSide = ref)}
//             onClick={this.changeState.bind(this)}
//           />
//           )}




          

//         </div>
//       </div>
//     );
//   }
// }



// const RightSide = (props) => {
//   return (
//     <div
//       className="right-side"
//       ref={props.containerRef}
//       onClick={props.onClick}
//     >
//       <div className="inner-container">
//         <div className="text">{props.current}</div>
//       </div>
//     </div>
//   );
// };

// export default Log;