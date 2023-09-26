import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage"; // Your login page component
import Home from "./pages/home"; // Your protected home page component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simulate successful login, set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Simulate logout, set isAuthenticated to false
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="/home"
        element={<Home onLogout={handleLogout} />}
      />
    </Routes>
  );
}

export default App;








// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/loginpage"; // Your login page component
// import Home from "./pages/home"; // Your protected home page component
// import axios from "axios";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleLogin = async (email, password) => {
//     const data = {
//       email: email,
//       password: password
//     };
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/check", data);
//       setIsAuthenticated(response.data.isAuthenticated);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Authentication error:", error);
//       setIsLoading(false);
//     }
//   };

//   const checkAuthentication = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/check-auth"); // Adjust the URL as needed
//       setIsAuthenticated(response.data.isAuthenticated);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Authentication error:", error);
//       setIsLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   checkAuthentication();
//   // }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={<LoginPage handleLogin={handleLogin} isAuthenticated={isAuthenticated} />}
//       />
//       <Route
//         path="/home"
//         element={isAuthenticated ? <Home /> : <Navigate to="/" />}
//       />
//     </Routes>
//   );
// }

// export default App;








// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// // import ProtectedRoute from "./pages/ProtectedRoute";
// // import LoginPage from "./pages/loginpage"; // Your login page component
// // import Home from "./pages/home"; // Your protected home page component

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   const handleLogin = () => {
// //     // Simulate successful login, set isAuthenticated to true
// //     setIsAuthenticated(true);
// //   };

// //   const handleLogout = () => {
// //     // Simulate logout, set isAuthenticated to false
// //     setIsAuthenticated(false);
// //   };

// //   const ProtectedRoute = ({ isAuthenticated, ...props }) => {
// //     if (isAuthenticated) {
// //       return <Route {...props} />;
// //     } else {
// //       return <Navigate to="/login" />;
// //     }
// //   };

// //   return (
// // <Routes>
// //   <Route path="/login" element={<LoginPage />} />
// //   <ProtectedRoute
// //     path="/protected"
// //     element={<Home />}
// //     isAuthenticated={isAuthenticated}
// //   />
// // </Routes>
    
// //   );
// // }

// // export default App;



// // import {
// //   Routes,
// //   Route,
// //   } from "react-router-dom";
// // import Log from "./pages/log";
// // import Home from "./pages/home";
// // import { useEffect, useState } from "react";
// // import ProtectedRoutes from "./components/ProtectedRoutes";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";  

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
  
// //   const handleLogin = async(email, password) => {
// //     const data = 
// //     { email: email,
// //        password: password
// //     };
// //     try {
// //       const response = await axios.post("http://127.0.0.1:5000/check", data);
// //       setIsAuthenticated(response.data.isAuthenticated);
// //       setIsLoading(false);
// //       setIsAuthenticated(true);
// //     } catch (error) {
// //       console.error("Authentication error:", error);
// //       setIsLoading(false);
// //     }
// //   };
// //   const checkAuthentication = async () => {
// //     try {
// //       const response = await axios.post("http://127.0.0.1:5000/check", data);
// //       setIsAuthenticated(response.data.isAuthenticated);
// //       setIsLoading(false);
// //       setIsAuthenticated(true);
// //     } catch (error) {
// //       console.error("Authentication error:", error);
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     checkAuthentication();
// //   }, []);

// //   if (isLoading) {
// //     return <div>Loading...</div>;
// //   }



// //   return (

// //     <Routes>
// //       <Route path="/" element={<Log  handleLogin={handleLogin(email, password)}/>} />
// //       <Route
// //         path="/home"
// //         element={isAuthenticated ? <Home /> : <Log />}
// //       />
// //     </Routes>

// //   );
// // }
// // export default App;
