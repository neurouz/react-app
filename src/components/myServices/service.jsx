import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../../styles/service.css";

export default function Service(props) {
  console.log(props.item);
  let iconRotationAngle = 0;

  const toggleRotate = (element) => {
    iconRotationAngle = iconRotationAngle === 0 ? 90 : 0;
    element.style.transform = `rotate(${iconRotationAngle}deg)`;
  };

  const toggleDetails = (element) => {
    let height = element.style.height;
    height = element.style.height === "0px" ? "150px" : "0px";
    element.style.height = height;

    let opacity = element.style.opacity;
    opacity = element.style.opacity === "0" ? "1" : "0";
    element.style.opacity = opacity;
  };

  const showDetails = (e, id) => {
    const element = document.getElementById(`icon-${id.toString()}`);
    const details = document.getElementById(`details-${id.toString()}`);
    toggleRotate(element);
    toggleDetails(details);
  };

  return (
    <div className="service-parent w-100 d-flex flex-column align-items-center mt-3">
      <div className="service d-flex flex-row justify-content-center w-75 align-items-center">
        <h4 className="service-title font-weight-bold">
          {props.item.toolName}
        </h4>
        <p className="service-type">{props.item.serviceType}</p>
        <p className="service-quantity">Quantity: {props.item.quantity}</p>
        <p className="service-created">
          Service created:{" "}
          {new Date(props.item.dateCreated).toLocaleDateString()}
        </p>
        <button
          disabled={!props.item.attachment}
          className="btn btn-success btn-sm service-download"
        >
          Download attachment
        </button>
        <button
          className="btn btn-info btn-sm service-details"
          onClick={(e) => showDetails(e, props.item.id)}
        >
          <FontAwesomeIcon
            id={`icon-${props.item.id}`}
            icon={faChevronDown}
            style={{ color: "white", transition: "transform .25s" }}
          ></FontAwesomeIcon>
          {"  "}Details
        </button>
      </div>
      <div
        id={`details-${props.item.id}`}
        className="text-center font-weight-bold service-details"
        style={{ height: "0px", opacity: "0" }}
      >
        <p>Some text</p>
        <hr />
        <br />
        <p> Some text 2 </p>
      </div>
    </div>
  );
}
