import React from "react";

// props.name, props.iconClass, props.name, props.placeholder, props.type
export default function Input(props) {
  return (
    <div className="form-group input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={props.iconClass ?? ""}></i>
        </span>
      </div>
      <input
        autoFocus={props.autofocus}
        name={props.name}
        className="form-control"
        placeholder={props.placeholder}
        type={props.type}
        ref={props.register}
      />
    </div>
  );
}
