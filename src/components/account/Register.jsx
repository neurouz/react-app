import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";

import "../../styles/registrationForm.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import RegisterLogo from "../../images/register.svg";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default function Register() {
  const { register, handleSubmit, errors, watch } = useForm({ mode: "onBlur" });

  const [data, setData] = useState([]);

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    let mounted = true;
    const service = new APIService();
    service.GetAsync("Area").then((response) => {
      if (mounted) setData(response.data);
    });
    return () => (mounted = false);
  }, []);

  const onSubmit = (data) => {
    data.areaId = Number.parseInt(data.areaId);

    const promise = APIService.PostAsync("Customer", data);
    promise
      .then((response) => {
        if (response.status === 200)
          toastr.success(
            "You can now log in to your account.",
            "Account created!"
          );
      })
      .catch((error) => {
        toastr.error(
          "If you have troubles with registration, feel free to contact us.",
          "Server error"
        );
      });
  };

  return (
    <div className="register-form">
      <div className="register-left">
        <h2 className="title-main text-center font-weight-bold">
          Register your company
        </h2>
        <p className="text-center">
          As registered user, you will be able to purchase items and send
          requests for tool servicing{" "}
        </p>
        <img src={RegisterLogo} alt="register-logo" className="register-logo" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-register">
        <p className="title text-center font-weight-bold">
          Please fill the form below
        </p>
        <p className="font-weight-bold"> Company details </p>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-building"></i>
            </span>
          </div>
          <input
            name="companyName"
            className="form-control"
            placeholder="Company name"
            type="text"
            ref={register({ required: "Company name is required" })}
          />
        </div>
        {errors.companyName && <p>{errors.companyName.message}</p>}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-map-marker"></i>
            </span>
          </div>
          <input
            name="address"
            className="form-control"
            placeholder="Company address"
            type="text"
            ref={register({ required: "Company address is required" })}
          />
        </div>
        {errors.address && <p>{errors.address.message}</p>}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name="email"
            className="form-control"
            placeholder="Email address"
            type="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        {errors.email && errors.email.type === "required" && (
          <p>E-mail is required</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>E-mail must be in correct format</p>
        )}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-phone"></i>
            </span>
          </div>
          <select className="custom-select">
            <option defaultValue="0">+387 </option>
            <option value="1">+381 </option>
            <option value="2">+385 </option>
            <option value="3">+382 </option>
          </select>
          <input
            name="phoneNumber"
            className="form-control"
            placeholder="Phone number"
            type="text"
            ref={register({ required: "Phone number is required" })}
          />
        </div>
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-building"></i>
            </span>
          </div>
          <select name="areaId" ref={register} className="form-control">
            {data.map((area) => (
              <option key={area.id} value={area.id}>
                {area.areaName}
              </option>
            ))}
          </select>
        </div>
        <br />
        <p className="font-weight-bold">Account credentials</p>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-user"></i>
            </span>
          </div>
          <input
            name="username"
            className="form-control"
            placeholder="Username"
            type="text"
            ref={register({ required: "Username is required" })}
          />
        </div>
        {errors.username && <p>{errors.username.message}</p>}
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password"
            className="form-control"
            placeholder="Create password"
            type="password"
            ref={register({
              required: "You must specify a password",
              minLength: {
                value: 6,
                message: "Password must contain at least 6 characters",
              },
            })}
          />
        </div>
        {errors.password && <p>{errors.password.message}</p>}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="passwordConfirm"
            className="form-control"
            placeholder="Repeat password"
            type="password"
            ref={register({
              required: "You must specify a password",
              validate: (value) =>
                value === password.current || "Passwords do not match",
            })}
          />
        </div>
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>
        </div>
        <p className="text-center">
          Have an account? <a href="/">Log In</a>
        </p>
      </form>
    </div>
  );
}

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};
