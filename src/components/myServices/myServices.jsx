import React, { useState, useEffect } from "react";
import APIService from "../../services/apiService";
import LocalStorageService from "../../services/LocalStorageService";
import { useLocation } from "react-router-dom";
import Unauthorized from "../auth/unauthorized";
import Service from "./service";

export default function MyServices(props) {
  const [services, setServices] = useState([]);
  const location = useLocation();
  const [auth, setAuth] = useState(LocalStorageService.GetApiKey());

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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [auth]);

  if (!auth) {
    return <Unauthorized></Unauthorized>;
  }
  return (
    <div>
      <h2 className="text-center font-weight-bold mt-5"> My services </h2>
      <hr style={{ width: "70%" }} /> <br />
      {services.map((service) => (
        <Service key={service.id} item={service}></Service>
      ))}
    </div>
  );
}
