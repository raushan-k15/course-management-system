import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as randomId } from "uuid";
const SignUp = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    id: randomId(),
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  let { password, confirmPassword, email, username } = formData;

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //!pass confirmation
    if (password !== confirmPassword) {
    toast.error("Passwords do not match ❌");
    return;
    }

    // ! checking if user already exists
    let alreadyExist = await axios.get(
      `http://localhost:3000/users?email=${email}`,
    );
    console.log(alreadyExist);

    if (alreadyExist.data.length > 0) {
      toast.error("User Already Exists");
    } else {
      try {
        let res = await axios.post("http://localhost:3000/users", formData);
        console.log(res);
        if (res.status == 201) {
          toast.success("Account Created Successfully");
          navigate("/login");
        }
      } catch (err) {
        toast.error("Some error has occured");
      }
    }
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
  <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
    
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/20 border border-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-lg transition-all duration-500 hover:scale-105"
    >
      
      <h2 className="text-4xl space-y font-bold mb-8 text-center text-white tracking-wide">
        Create Account 🚀
      </h2>
      <br/>
      {/* Username */}
      <div className="mb-5">
        <input
          type="text"
          value={username}
          onChange={handleChange}
          name="username"
          className="w-full px-5 py-5 space-y text-lg rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
          placeholder="👤 Username"
        />
      </div>
      <br/>
      {/* Email */}
      <div className="mb-5">
        <input
          type="email"
          onChange={handleChange}
          value={email}
          name="email"
          className="  m-*  w-full px-5 py-5 space-y text-lg rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
          placeholder="📧 Email"
        />
      </div>
      <br/>
      {/* Password */}
      <div className="mb-5">
        <input
          type="password"
          onChange={handleChange}
          value={password}
          name="password"
          className="  m-* w-full px-5 py-5  space-y text-lg rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          placeholder="🔒 Password"
        />
      </div>
      <br/>
      {/* Confirm Password */}
      <div className="mb-7">
        <input
          type="password"
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
          className="  m-*  w-full px-5 py-5 space-y text-lg rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
          placeholder="🔁 Confirm Password"
        />
      </div>
      <br/>
      {/* Button */}
      <button
        type="submit"
        className=" m-* w-full space-y  bg-white text-purple-600 font-semibold py-3 text-lg rounded-xl hover:bg-purple-100 transition duration-300 shadow-lg"
      >
        Sign Up
      </button>
    
      {/* Footer */}
      <p className="text-center text-white mt-5 text-base">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="font-semibold underline cursor-pointer hover:text-gray-200"
        >
          Login
        </span>
      </p>
    </form>
  </div>
);
};

export default SignUp;
