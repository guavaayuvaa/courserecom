import  { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate("/landing");
        } else {
          console.error("Login successful but no token received");
        }
      } else {
        console.error("Login failed");
      }
    } catch (err) {
      console.error("Login failed", err.message);
    }
  };
  return (
    <div className="h-screen w-full flex bg-gray-200 overflow-hidden px-10 py-8 gap-4">
      <img
        className="w-[55%] h-full overflow-hidden rounded-2xl"
        src="/assets/login.jpg"
      />

      <form
        onSubmit={handleFormSubmit}
        className="w-[45%] bg-white flex flex-col items-center  rounded-2xl"
      >
        <p className=" text-blue-800 text-center text-4xl font-bold mt-6">
          Log In to Continue your Learning Journey
        </p>
        <div className="text-center space-y-4 mt-12 w-full px-20">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-serif font-semibold text-gray-700 mb-6 text-center"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-serif font-semibold text-gray-700 mb-6 mt-10 text-center"
            >
              Password
            </label>
            <div className="flex border border-gray-300 rounded-md shadow-sm pr-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={isVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className=" mt-1 block w-full p-2 focus:outline-none"
                a
              />
              <div className="ml-4 mt-3">
                <button onClick={handleShowPassword}>
                  {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            <div className="h-full flex justify-center items-center">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-800 text-white rounded-2xl mt-6 hover:bg-blue-600 font-semibold"
              >
                Login
              </button>
            </div>
            <div className="text-center mt-6">
              <p className="text-black font-medium">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-red-500 font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

