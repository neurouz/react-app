import React from "react";

export default function Service(props) {
  console.log(props.item);
  return (
    <div className="service-parent w-100 d-flex justify-content-center mt-3">
      <div className="service d-flex flex-row justify-content-between w-75 align-items-center">
        <h4 style={{ width: "200px" }} className="service-title">
          {props.item.toolName}
        </h4>
        <p className="service-type">{props.item.serviceType}</p>
        <p className="quantityy">Quantity: {props.item.quantity}</p>
        <p>
          Service created:{" "}
          {new Date(props.item.dateCreated).toLocaleDateString()}
        </p>
        {props.item.note && <p>{props.item.note}</p>}
        <button
          disabled={!props.item.attachment}
          className="btn btn-success btn-sm"
        >
          Download attachment
        </button>
      </div>
    </div>
  );
}
