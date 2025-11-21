import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { themeContext } from "../Context/themeContext";

export default function Signup() {
  const {theme} = useContext(themeContext)
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  // Schema to set the validation on inputs, like type, min, max and the regex.
  const signupSchema = z
    .object({
      name: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(
          /^[A-Za-z][A-Za-z0-9-]*$/,
          "Only letters, numbers or dash allowed"
        ),

      email: z.string().email("Enter a valid email address"),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
          "Password must include uppercase, lowercase, number, and special character"
        ),

      rePassword: z.string().min(8, "Please confirm your password"),

      dateOfBirth: z.string().nonempty("Please select your date of birth"),

      gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Please select gender" }),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Function to submit the data and send it to api, using useForm hook, handle submit anf register.
  async function onSubmit(values) {
    console.log("Data:", values);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      console.log("Response:", data);

      if (data.message === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className={`flex justify-center items-center h-screen ${theme} bg-light text-Tlight dark:bg-darkBg dark:text-Tdark text-center `}>
      <div className={`w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-2xl ${theme} bg-light dark:bg-darkLr`}>
        <h1 className={`${styles.Heading} text-center mt-4`}>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label className={`input validator w-[80%] mt-5 mb-2 rounded-2xl ${theme} focus:not-dark:ring-Tlight  bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}>
            <input
              {...register("name")}
              type="text"
              placeholder="Username"
              className="w-full"
            />
          </label>
          {errors.name && (
            <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
          )}

          {/* Email */}
          <label className={`input validator w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}>
            <input
              {...register("email")}
              type="email"
              placeholder="User Email"
              className="w-full"
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className={`input validator w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <label className={`input validator w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}>
            <input
              {...register("rePassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full"
            />
          </label>
          {errors.rePassword && (
            <p className="text-red-500 text-sm mb-2">
              {errors.rePassword.message}
            </p>
          )}

          {/* Date of Birth */}
          <input
            {...register("dateOfBirth")}
            type="date"
            className={`input w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mb-2">
              {errors.dateOfBirth.message}
            </p>
          )}

          {/* Gender */}
          <div className="genderCheck w-[80%] mb-2 mx-auto text-left">
            <h4 className="ms-1">Gender:</h4>
            <input
              {...register("gender")}
              type="radio"
              id="male"
              value="male"
              onChange={() => setGender("male")}
              className="radio radio-sm me-2 mb-1 ms-1"
            />
            <label
              htmlFor="male"
              className={`me-3 ${
                gender === "male" ? "opacity-100" : "opacity-50"
              }`}
            >
              Male
            </label>

            <input
              {...register("gender")}
              type="radio"
              id="female"
              value="female"
              onChange={() => setGender("female")}
              className="radio radio-sm me-2 ms-1 mb-1"
            />
            <label
              htmlFor="female"
              className={`${
                gender === "female" ? "opacity-100" : "opacity-50"
              }`}
            >
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mb-2">{errors.gender.message}</p>
          )}

          <button
            type="submit"
            className={`btn w-[50%] mt-4 mx-auto text-left rounded-2xl  ${theme} bg-black dark:bg-light text-white dark:text-Tlight border border-black dark:border-white hover:bg-white dark:hover:bg-darkLr hover:text-black dark:hover:text-white transition-all duration-300`}
          >
           Sign Up
          </button>
          <p className="mt-2 mb-5 text-xs">Already have an account? <a className="cursor-pointer text-blue-500" onClick={()=> navigate('/login')}>Login</a> </p>
        </form>
      </div>
    </div>
  );
}
