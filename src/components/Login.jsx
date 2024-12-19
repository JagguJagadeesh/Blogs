import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../store/authslice";
import authservice from "../appwrite/Auth";
import { Input, Button,Logo } from "./index";
import { useForm } from "react-hook-form";


function Login() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.getcurrentuser();
        if (userData) {
          dispatch(authlogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container bg-gray-400 rounded-lg mb-20 mx-auto max-w-md p-6">
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      <div className="w-full  flex flex-col gap-4">
        <Logo/>
        <h1 className="text-xl font-semibold text-center">Please Login</h1>
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              type="password"
              className="w-full "
              placeholder="Enter Your Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full " text="Log in" />
        </form>
        <p className="mt-4 text-center text-base text-white">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
