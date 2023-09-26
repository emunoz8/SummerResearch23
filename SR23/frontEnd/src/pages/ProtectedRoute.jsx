import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, ...props }) => {
  if (isAuth) {
    return <Route {...props} />;
  } else {
    return <Navigate to="/loginpage" />;
  }
};

export default ProtectedRoute;



// import React, { useState, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Log from "../pages/log";
// import axios from "axios";

// const ProtectedRoutes = (props) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const authenticate = async (data) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/check", data);
//       console.log(response);
//       console.log(response.data.message);
//       return response.data.message === "success";
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await authenticate(props.data);
//         setIsAuthenticated(result);
//         setIsLoading(false);

//         if (result) {
//           navigate("/home");
//         }

//       } catch (error) {
//         console.error("Error:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [props.data, navigate]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Log />;
// };




// export default ProtectedRoutes;





// // import { Outlet } from "react-router-dom";
// // import Log from "../pages/log";
// // import axios from "axios";

// // class ProtectedRoutes extends Component {
// //   state = {
// //     isAuthenticated: false,
// //     isLoading: true,
// //   };

// //   static useAuth = async (data) => {
// //     try {
// //       const response = await axios.post("http://127.0.0.1:5000/check", data);
// //       console.log(response);
// //       console.log(response.data.message);
// //       return response.data.message === "success";
// //     } catch (error) {
// //       console.error("Error:", error);
// //       throw error;
// //     }
// //   };

// //   async componentDidMount() {
// //     const { data, history } = this.props;
// //     try {
// //       const result = await this.useAuth(data);
// //       this.setState({
// //         isAuthenticated: result,
// //         isLoading: false,
// //       });

// //       // if (result) {
// //       //   history.push("/home");
// //       // }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       this.setState({
// //         isLoading: false,
// //       });
// //     }
// //   }


// //   render() {
// //     const { isAuthenticated, isLoading } = this.state;

// //     if (isLoading) {
// //       return <div>Loading...</div>;
// //     }

// //     return isAuthenticated ? <Outlet /> : <Log />;
// //   }
// // }

// // export default ProtectedRoutes;


// // // import React, { useState, useEffect } from "react";
// // // import { Outlet } from "react-router-dom";
// // // import Log from "../pages/log";
// // // import axios from "axios";

// // /*
// //     This is a custom hook that is used to check if 
// //     the user is authenticated or not. Called by ProtectedRoutes 
// //     function
// // */
// // // const useAuth = (data) => {
// // //     return new Promise((resolve, reject) => {
// // //       axios
// // //         .post("http://127.0.0.1:5000/check", data)
// // //         .then((response) => {
// // //           console.log(response);
// // //           console.log(response.data.message);
// // //           const rValue = response.data.message === "success" ? true : false;
// // //           resolve(rValue);
// // //         })
// // //         .catch((error) => {
// // //           console.error("Error:", error);
// // //           reject('error');
// // //         });
// // //     });
// // //  };



// // // const useAuth = (data) => {
// // //     let rValue = false;  
// // //     axios
// // //         .post("http://127.0.0.1:5000/check", data)
// // //         .then((response) => {
// // //         console.log(response);
// // //         console.log(response.data.message)
// // //         rValue = response.data.message === "success" ? true : false;
// // //         })
// // //         .catch((error) => {
// // //         console.error("Error:", error);
// // //         });   
        
// // //         return rValue;
// // // };



// // /*This is a function that is called by App.js
// //     It checks if the user is authenticated or not
// //     If the user is authenticated, it returns the Outlet component
// //     If the user is not authenticated, it returns the Log component
// // */
// // // const ProtectedRoutes = async (data) =>{
    
// // //     try{
// // //         const isAuth = await useAuth(data);
// // //         return isAuth ? <Outlet /> : <Log /> ;

// // //     }
// // //     catch(error){
// // //         console.log(error);
// // //         return <Log />;
// // //     }
// // // };
// // //     export default ProtectedRoutes;
