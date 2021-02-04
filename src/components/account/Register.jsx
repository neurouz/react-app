import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import Input from "../formComponents/Input";
import Select from "../formComponents/Select";

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
    APIService.GetAsync("Area").then((response) => {
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

        <Input
          iconClass="fa fa-building"
          name="companyName"
          placeholder="Company name"
          type="text"
          register={register({ required: "Company name is required" })}
        ></Input>
        {errors.companyName && <p>{errors.companyName.message}</p>}

        <Input
          iconClass="fa fa-map-marker"
          name="address"
          placeholder="Company address"
          type="text"
          register={register({ required: "Company address is required" })}
        ></Input>
        {errors.address && <p>{errors.address.message}</p>}

        <Input
          iconClass="fa fa-envelope"
          name="email"
          placeholder="Email address"
          type="email"
          register={register({ required: true, pattern: /^\S+@\S+$/i })}
        ></Input>
        {errors.email && errors.email.type === "required" && (
          <p>E-mail is required</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>E-mail must be in correct format</p>
        )}

        <Input
          iconClass="fa fa-phone"
          name="phoneNumber"
          placeholder="Phone number"
          type="text"
          register={register({ required: "Phone number is required" })}
        ></Input>
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <Select
          iconClass="fa fa-building"
          register={register}
          data={data}
          keyName="id"
          valueName="areaName"
          name="areaId"
        ></Select>

        <br />
        <p className="font-weight-bold">Account credentials</p>

        <Input
          iconClass="fa fa-user"
          name="username"
          placeholder="Username"
          type="text"
          register={register({ required: "Username is required" })}
        ></Input>
        {errors.username && <p>{errors.username.message}</p>}

        <Input
          iconClass="fa fa-lock"
          name="password"
          placeholder="Create password"
          type="password"
          register={register({
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
          })}
        ></Input>
        {errors.password && <p>{errors.password.message}</p>}

        <Input
          iconClass="fa fa-lock"
          name="passwordConfirm"
          placeholder="Repeat password"
          type="password"
          register={register({
            required: "You must specify a password",
            validate: (value) =>
              value === password.current || "Passwords do not match",
          })}
        ></Input>
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
