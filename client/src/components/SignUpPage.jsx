import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON data
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const handleShowPassword = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-200">
      <img
        className="w-[45%] h-screen verflow-hidden mt-5 ml-12 mb-12 mr-10 rounded-2xl"
        src="/assets/login.jpg"
      />

      <form
        className="w-[45%] bg-white flex flex-col py-4 items-center mt-5 mb-12 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <p className=" text-blue-800 text-center text-4xl font-bold mt-6">
          {" "}
          Sign Up and Start Learning
        </p>
        {/* Email Field */}
        <div className="text-center space-y-4 mt-14 w-full px-20">
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-serif font-semibold text-gray-700 mb-3"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-serif font-semibold text-gray-700 mb-3"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.username}
              required
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-serif font-semibold text-gray-700 mb-3"
            >
              Password
            </label>
            <div className="flex justify-between">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                required
                onChange={handleChange}
              />
              <div className="ml-4 mt-3">
                <button onClick={handleShowPassword}>Show</button>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-serif font-semibold text-gray-700 mb-3"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {/* <div className='ml-4 mt-3'>
        <button onClick={handleShowPassword}>Show</button>
        </div> */}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-800 mt-6 text-white rounded-2xl py-2 px-5 font-semibold hover:bg-blue-600"
            >
              Sign Up
            </button>
            {/* Navigation Link */}
            <p className="text-black mt-4 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
