import React, { useState } from "react";
import { FaUser, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [username, setUsername] = useState(""); // Changed to camelCase for consistency
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [preload, setPreload] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous error
    setError("");

    // Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please fill out all fields");
      return;
    }

    if (!emailRegex.test(username)) {
      setError("Invalid email format!");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long, include a number, and a special character"
      );
      return;
    }

    setPreload(true); // Show loading spinner

    try {
      // Attempt sign-in
      await signInWithEmailAndPassword(auth, username, password);
   alert("Welcome " + username);


      setTimeout(() => {
        setPreload(false);
        navigate("/details"); // Redirect to the details page
      }, 1000);
    } catch (err) {
      setPreload(false);
      setError(
        err.message || "Failed to log in. Please check your credentials."
      );
      toast.error("Login failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-orange-600 my-8">
        Welcome
      </h1>
      <div className="bg-gradient-to-b from-orange-500 to-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Sign In to Your Account
          </h2>
          <form onSubmit={onSubmitHandler}>
            <div className="w-full">
            
              <div className="relative mb-4">
                <span className="absolute left-4 top-4 text-gray-400">
                  <FaUser />
                </span>
                <input
                  type="email" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  className="p-4 pl-12 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

             
              <div className="relative mb-4">
                <span className="absolute left-4 top-4 text-gray-400">
                  <FaKey />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="p-4 pl-12 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

             
              {error && (
                <div className="p-1 m-1">
                  <p className="font-bold text-red-700">{error}</p>
                </div>
              )}

             
             
            </div>

            {/* Loading Spinner or Submit Button */}
            {preload ? (
              <div className="flex justify-center mb-4">
                <div className="w-6 h-6 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition duration-300"
              >
                Login
              </button>
            )}

            {/* Register Redirect */}
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/Register"
                className="text-orange-600 hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
