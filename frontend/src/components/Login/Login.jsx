import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lbg from "../../assets/lbg.png";
import limage from "../../assets/logimage.png";
import axiosInstance from "../../utils/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Store user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      // Check role and navigate accordingly
      const role = data.role;
      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "presenter") {
        window.location.href = "/presenter-dashboard";
      } else {
        throw new Error("Invalid role");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please check your credentials."
      );
      // Clear any potentially corrupted authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen font-poppins flex flex-col items-center bg-gray-100 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${lbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center mt-[50px]">
        <div className="bg-white flex justify-between p-10 w-[1000px] h-[550px] rounded-xl shadow-lg">
          {/* Image side */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold space-y-5 text-orange-500">
              Welcome to <br /> MOVO
            </h1>
            <img
              className="h-[400px] w-[400px]"
              src={limage}
              alt="Presenter Illustration"
            />
          </div>

          {/* Form side */}
          <div className="w-[400px]">
            <h1 className="text-3xl font-semibold">User Login</h1>
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="mt-5">
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                  className="border-b border-black p-2"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  className="border-b border-black p-2"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-center mt-5 hover:bg-orange-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;