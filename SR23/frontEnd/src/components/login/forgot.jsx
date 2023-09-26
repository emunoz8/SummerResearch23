import React from "react";
import forgotImage from "../../forgot.png";

const Forgot = (props) => {
  const handleLoginClick = () => {
    // Call the callback function provided by props
    props.onReturnToLogin();
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Forgot Password</div>
      <div className="content">
        <div className="image">
          <img src={forgotImage} alt="Forgot Password" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Submit
        </button>
        <div className="forgot-password" onClick={handleLoginClick}>
          Return to Login
        </div>
      </div>
    </div>
  );
};

export default Forgot;



// import React from "react";
// import loginImg from "../../login.svg";

// export class Forgot extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   handleLoginClick = () => {
//     // Call the callback function provided by props
//     this.props.onReturnToLogin();
//   };


//   render() {
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <div className="header">Forgot Password</div>
//         <div className="content">
//           <div className="image">
//             <img src={loginImg} />
//           </div>
//           <div className="form">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" name="email" placeholder="email" />
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <button type="button" className="btn">
//             Submit
//           </button>
//           <div className="forgot-password" onClick={this.handleLoginClick}>
//             Return to Login
//           </div>
//         </div>
//       </div>
//     );
//   }
// }