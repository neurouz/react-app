import React from "react";
import { useForm } from "react-hook-form";
import APIService from "../../services/apiService";
import LocalStorageService from "../../services/LocalStorageService";
import { useLocation } from "react-router-dom";

// Other scripts
import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Custom components
import Input from "../formComponents/Input";
import "../../styles/loginForm.css";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  const location = useLocation();

  const loginSubmit = async (data) => {
    try {
      const result = await APIService.LoginAsync(data);
      if (result.status === 200) {
        LocalStorageService.SetJsonData(result.data);
        const apiKey = btoa(data.username + ":" + data.password);
        localStorage.setItem("etoolservice_api_key", apiKey);
        location.auth();
        toastr.success("Login sucessful", "Info");
      } else {
        toastr.error("Username or password are incorrect", "Error");
      }
    } catch (e) {
      toastr.error("Please check your network connection", "Error");
      console.log(e);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(loginSubmit)}>
        <div className="avatar">
          <i className="fa fa-user"></i>
        </div>
        <h4 className="modal-title">Login to Your Account</h4>
        <div className="form-group">
          <Input
            iconClass="fa fa-user"
            name="username"
            placeholder="Your username"
            type="text"
            register={register({ required: "Username is required" })}
          ></Input>
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <Input
            iconClass="fa fa-lock"
            name="password"
            placeholder="Your password"
            type="password"
            register={register({
              required: "You must specify a password",
            })}
          ></Input>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group small clearfix">
          <label className="checkbox-inline">
            <input type="checkbox" /> Remember me
          </label>
          <a href="/" className="forgot-link">
            Forgot Password?
          </a>
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          value="Login"
        />
      </form>
      <div className="text-center small">
        Don't have an account? <a href="/">Sign up</a>
      </div>
    </div>
  );
}
