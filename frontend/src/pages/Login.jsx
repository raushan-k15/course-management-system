import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(Auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!email || !password || !role) {
      toast.error("Please fill all fields ❌");
      return;
    }

    try {
  let res =
  await axios.get(
    `https://course-management-system-zibg.onrender.com/users?email=${email}&password=${password}&role=${role}`
  );

      if (res.status === 200 && res.data.length > 0) {
        login(res.data[0]);
        toast.success("Login Successful ✅");
        navigate("/");
      } else {
        toast.error("Invalid Credentials ❌");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setFormData({
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login 🔐
        </h2>
        <br/>
        {/* Email */}
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="📧 Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
           <br/>
           <br/>
        {/* Password */}
          <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="🔒 Password"
          className="w-full px-4 py-3 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
        />

        {/* Icon */}
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-purple-600 transition"
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
        <br/>
           <br/>
        {/* Role */}
        <div className="mb-4 text-white flex gap-6 items-center">
          <span className="font-medium">Role:</span>

          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
            />
            User
          
          </label>

          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        <br/>
        {/* Button */}
        <button
          type="submit"
          className="w-full mt-3 bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-purple-100 transition"
        >
          Login
        </button>
        {/* Footer */}
        <p className="text-center text-white mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline hover:text-gray-200"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;