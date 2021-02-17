import React, { useState, useEffect } from "react";
import APIService from "../../services/apiService";
import LocalStorageService from "../../services/LocalStorageService";
import Unauthorized from "../auth/unauthorized";
import Service from "./service";

import "../../styles/services.css";

export default function MyServices(props) {
  const [services, setServices] = useState([]);
  const [auth] = useState(LocalStorageService.GetApiKey());
  const [copy, setCopy] = useState([]);

  useEffect(() => {
    if (auth) {
      const customerId = LocalStorageService.GetJsonData().customerId;
      APIService.GetWithAuthAsync(
        `ToolService?CustomerId=${customerId}`,
        LocalStorageService.GetApiKey()
      )
        .then((res) => {
          if (res.status === 200) {
            setServices([...res.data]);
            setCopy([...res.data]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth]);

  const filterServices = (e) => {
    const select = Number.parseInt(
      document.getElementById("select-filter").value
    );
    const input = document.getElementById("search-filter").value;

    let array = [...copy];

    if (input) {
      array = array.filter((service) =>
        service.toolName.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (select === 2) {
      array = array.filter((x) => x.responsed === true);
    } else if (select === 3) {
      array = array.filter((x) => x.responsed === false);
    }

    setServices([...array]);
  };

  if (!auth) {
    return <Unauthorized></Unauthorized>;
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-around w-75 m-auto">
        <h2 className="text-center font-weight-bold mt-5"> My services </h2>
        <div className="filters">
          <input
            id="search-filter"
            onChange={filterServices}
            className="form-control align-self-start w-25"
            type="text"
            name="service-search"
            placeholder="Search services .."
            style={{ width: "30%" }}
          />
          <select
            id="select-filter"
            name="filter"
            className="form-control"
            onChange={filterServices}
          >
            <option value={1}>Show all</option>
            <option value={2}>Only responsed</option>
            <option value={3}>Not responsed</option>
          </select>
        </div>
      </div>
      <hr style={{ width: "75%" }} /> <br />
      {services.map((service) => (
        <Service key={service.id} item={service}></Service>
      ))}
    </div>
  );
}
