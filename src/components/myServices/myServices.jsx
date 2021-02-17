import React, { useState, useEffect } from "react";
import APIService from "../../services/apiService";
import LocalStorageService from "../../services/LocalStorageService";
import Unauthorized from "../auth/unauthorized";
import Service from "./service";

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
    const search = e.target.value;
    if (e.target.value) {
      const array = copy.filter((service) =>
        service.toolName.toLowerCase().includes(search.toLowerCase())
      );
      setServices([...array]);
    } else setServices([...copy]);
  };

  if (!auth) {
    return <Unauthorized></Unauthorized>;
  }
  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-around w-50 m-auto">
        <h2 className="text-center font-weight-bold mt-5"> My services </h2>
        <input
          onChange={filterServices}
          className="form-control align-self-start w-25"
          type="text"
          name="service-search"
          placeholder="Search services .."
          style={{ width: "150px" }}
        />
      </div>
      <hr style={{ width: "50%" }} /> <br />
      {services.map((service) => (
        <Service key={service.id} item={service}></Service>
      ))}
    </div>
  );
}
