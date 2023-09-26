import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    passwordMismatch: false,
    formErrors: {},
  });

  const validateForm = () => {
    const { firstname, lastname, email, password, confirmpassword } = state;
    const errors = {};

    if (!firstname) {
      errors.firstname = "First name is required";
    }
    if (!lastname) {
      errors.lastname = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirmpassword) {
      errors.confirmpassword = "Confirm password is required";
    }
    if (password !== confirmpassword) {
      errors.passwordMismatch = true;
    }

    return Object.keys(errors).length === 0;
  };

  const handlePostData = () => {
    const { firstname, lastname, email, password } = state;

    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:5000/user_insert", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="first name"
              value={state.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="last name"
              value={state.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmpassword"> Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="password"
              value={state.confirmpassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className={`btn ${validateForm() ? '' : 'disabled-button'}`}
          onClick={handlePostData}
          disabled={!validateForm()}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;









// import React from "react";
// import axios from "axios";

// export class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//       confirmpassword: '',
//       passwordMismatch: false,
//       formErrors: {},
//     };
//   }

//   validateForm = () => {
//     const { firstname, lastname, email, password, confirmpassword } = this.state;
//     const errors = {};

//     if (!firstname) {
//       errors.firstname = "First name is required";
//     }
//     if (!lastname) {
//       errors.lastname = "Last name is required";
//     }
//     if (!email) {
//       errors.email = "Email is required";
//     }
//     if (!password) {
//       errors.password = "Password is required";
//     }
//     if (!confirmpassword) {
//       errors.confirmpassword = "Confirm password is required";
//     }
//     if (password !== confirmpassword) {
//       errors.passwordMismatch = true;
//     }

//     return Object.keys(errors).length === 0;

//   };



//   handlePostData = () => {
//     const {firstname, lastname, email, password} = this.state;


//     const data = {
//       first_name: firstname,
//       last_name: lastname,
//       email: email,
//       password: password,
      
//     };

//     axios
//       .post("http://127.0.0.1:5000/user_insert", data)
//       .then((response) => {
//         console.log(response.data);

//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { formErrors } = this.state;
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <div className="header">Register</div>
//         <div className="content">
//           <div className="form">
//           <div className="form-group">
//               <label htmlFor="firstname">First Name</label>
//               <input 
//               type="text" 
//               name="firstname" 
//               placeholder="first name" 
//               value = {this.state.firstname}
//               onChange = {this.handleInputChange}
//               required
//               />


//             </div>
//             <div className="form-group">
//               <label htmlFor="lastname">Last Name</label>
//               <input 
//               type="text" 
//               name="lastname" 
//               placeholder="last name"
//               value = {this.state.lastname}
//               onChange = {this.handleInputChange}
//               required
//               />
//             </div>
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
//             <div className="form-group">
//               <label htmlFor="confirmpassword"> Confirm Password</label>
//               <input 
//               type="password" 
//               name="confirmpassword" 
//               placeholder="password" 
//               value = {this.state.confirmpassword}
//               onChange = {this.handleInputChange}
//               required
//               />
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <button type="button" 
//           className={`btn ${this.validateForm() ? '' : 'disabled-button'}`}
//           onClick={this.handlePostData}
//           disabled={!this.validateForm()} 
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
