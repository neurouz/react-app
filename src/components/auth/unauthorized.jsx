import React from "react";
import unauthorized from "../../images/401_unauthorized.png";
import "../../styles/statusCodes.css";

export default function Unauthorized() {
  return (
    <div className="content">
      <img src={unauthorized} alt="Not authorized" width="200"></img>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        <h4>
          Please check with the site admin if you believe this is a mistake.
        </h4>
      </div>
    </div>
  );
}
