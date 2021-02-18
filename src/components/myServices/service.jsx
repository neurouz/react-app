import React from "react";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import APIService from "../../services/apiService";
import LocalStorageService from "../../services/LocalStorageService";

import "../../styles/service.css";

export default function Service(props) {
  let iconRotationAngle = 0;

  const toggleRotate = (element) => {
    iconRotationAngle = iconRotationAngle === 0 ? 90 : 0;
    element.style.transform = `rotate(${iconRotationAngle}deg)`;
  };

  const toggleDetails = (element) => {
    let height = element.style.height;
    height = element.style.height === "0px" ? "180px" : "0px";
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

  const downloadAttachment = () => {
    const route = `File/Download/Services/${props.item.attachment}`;
    APIService.DownloadAsync(route, LocalStorageService.GetApiKey())
      .then((result) => {
        if (result.status === 200) {
          console.log(result);
          var url = window.URL || window.webkitURL;
          const link = url.createObjectURL(new Blob([result.data]));
          var a = document.createElement("a");
          a.setAttribute("download", props.item.attachment);
          a.setAttribute("href", link);
          a.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="service-parent w-100 d-flex flex-column align-items-center mt-3">
      <h4 className="service-title font-weight-bold text-center">
        Tool name: {props.item.toolName}
      </h4>
      <div>
        {(props.item.viewed && (
          <FontAwesomeIcon
            icon={faEye}
            style={{ color: "darkgreen" }}
            className="service-icon"
          ></FontAwesomeIcon>
        )) ||
          (!props.item.viewed && (
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{ color: "darkred" }}
              className="service-icon"
            ></FontAwesomeIcon>
          ))}
        {props.item.approved && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: "darkgreen" }}
            className="service-icon"
          ></FontAwesomeIcon>
        )}
      </div>
      <div className="service d-flex flex-row justify-content-center w-75 align-items-center">
        <div className="service-card-info d-flex flex-row justify-content-center">
          <p className="service-type">{props.item.serviceType}</p>
          <p className="service-quantity">Quantity: {props.item.quantity}</p>
          <p className="service-created">
            Service created:{" "}
            {new Date(props.item.dateCreated).toLocaleDateString()}
          </p>
        </div>

        <div className="service-buttons">
          <button
            disabled={!props.item.attachment}
            className="btn btn-success btn-sm service-download"
            onClick={downloadAttachment}
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
            {"  "} Details
          </button>
        </div>
      </div>
      <div
        id={`details-${props.item.id}`}
        className="text-center font-weight-bold service-details"
        style={{ height: "0px", opacity: "0" }}
      >
        <hr />

        <p>Responsed: {props.item.responsed ? "Yes" : "No"}</p>
        {props.item.note && <p> Your note: {props.item.note} </p>}
        {props.item.responsed && (
          <div className="responsed-service">
            <p>Approved: {props.item.approved ? "Yes" : "No"}</p>
            <p>Response message: {props.item.explanation}</p>
            <p>Service price: BAM {props.item.price}</p>
            <p>
              Finish date:{" "}
              {new Date(props.item.finishDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
