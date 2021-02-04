import React from "react";

// props.name, props.iconClass, props.name, props.placeholder, props.type
export default function Select(props) {
  return (
    <div className="form-group input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={props.iconClass}></i>
        </span>
      </div>
      <select name={props.name} ref={props.register} className="form-control">
        {props.data.map((prop) => (
          <option key={prop[props.keyName]} value={prop[props.keyName]}>
            {prop[props.valueName]}
          </option>
        ))}
      </select>
    </div>
  );
}
