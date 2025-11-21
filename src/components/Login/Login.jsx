import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useContext } from "react";
import { tokenContext } from "../Context/tokenContext";
import { themeContext } from "../Context/themeContext";

export default function Login() {
  const { theme } = useContext(themeContext);
  const { token, setToken } = useContext(tokenContext);
  // console.log('token', token);
  const navigate = useNavigate();
  const signupSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values) {
    console.log("Data:", values);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (data.message === "success") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        console.log(data.token);
        console.log("Loading.....");
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error.response?.data?.message || "Email not registered");
    }
  }

  return (
    <div
      className={`flex justify-center items-center h-screen ${theme} bg-light text-Tlight dark:bg-darkBg dark:text-Tdark text-center `}
    >
      <div
        className={`w-[90%] lg:w-[30%] md:w-[70%] sm:w-[90%] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-2xl ${theme} bg-light dark:bg-darkLr`}
      >
        <h1 className={`${styles.Heading} mt-4 mb-2`}>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label
            className={`input validator w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}
          >
            <input
              {...register("email")}
              type="email"
              placeholder="User Email"
              className="w-full bg-transparent focus:outline-none"
            />
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
          )}
          {/* Password */}
          <label
            className={`input validator w-[80%] mb-2 rounded-2xl ${theme} bg-light text-Tlight dark:bg-darkLr dark:text-Tdark border-black dark:border-light focus-within:outline-2 focus-within:outline-black dark:focus-within:outline-light`}
          >
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
          <button
            type="submit"
            className={`btn w-[50%] mt-4 mx-auto text-left rounded-2xl ${theme} bg-black dark:bg-light text-white dark:text-Tlight border border-black dark:border-white hover:bg-white dark:hover:bg-darkLr hover:text-black dark:hover:text-white transition-all duration-300`}
          >
            Login
          </button>
          <p className="mt-2 mb-6 text-xs">
            Don't have an account?{" "}
            <a
              className="cursor-pointer text-blue-500"
              onClick={() => navigate("/signup")}
            >
              Signup
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
