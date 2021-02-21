import React from "react";
import "../../styles/loader.css";

export default function Loader() {
  return (
    <div className="loader-parent">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
