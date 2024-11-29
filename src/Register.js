import React, { useState } from "react";
import { FaUser, FaComment, FaPhone, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, query, where, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation Regex Patterns
  const regexPatterns = {
    fullName: /^[a-zA-Z\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+?\d{1,3}[- ]?)?\d{10,14}$/,
    password: /^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/,
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  // Validate Inputs
  const validateInputs = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key.replace(/([A-Z])/g, " $1")} is required.`;
      } else if (!regexPatterns[key].test(formValues[key])) {
        errors[key] = `Invalid ${key.replace(/([A-Z])/g, " $1")} format.`;
      }
    });
    return errors;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        // Check if email already exists
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", formValues.email)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          toast.error("Email already exists. Please use a different email.", {
            position: "top-center",
            autoClose: 3000,
          });
          setIsLoading(false);
          return;
        }

        // Create Firebase Authentication user
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password
        );
        const user = userCredentials.user;

        // Save user data in Firestore
        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            fullName: formValues.fullName,
            phone: formValues.phone,
          });
        }

        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 3000,
        });

        setIsSubmitted(true);
        setFormValues({
          fullName: "",
          email: "",
          phone: "",
          password: "",
        });
      } catch (error) {
        console.error("Error occurred:", error.message);
        toast.error(error.message || "Registration failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <h1 className="text-2xl text-orange-500 font-bold font-serif m-10 my-8 text-center">
        Register
      </h1>
      <div className="bg-gradient-to-b from-orange-500 to-gray-50 min-h-screen p-1 flex items-center justify-center">
        <div className="bg-gray-50 p-10 rounded-xl shadow-xl w-full max-w-md">
          {isSubmitted ? (
            <div className="text-center">
              <h2 className="text-green-500 text-2xl font-bold mb-4">
                Registration Successful!
              </h2>
              <p className="text-gray-600">Thank you for signing up.</p>
              <Link
                to="/SignIn"
                className="mt-4 inline-block text-orange-500 underline"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {["fullName", "email", "phone", "password"].map((field) => (
                <div key={field} className="relative mb-4">
                  <span className="absolute left-4 top-4 text-gray-400">
                    {field === "fullName" && <FaUser />}
                    {field === "email" && <FaComment />}
                    {field === "phone" && <FaPhone />}
                    {field === "password" && <FaKey />}
                  </span>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    className="p-3 pl-12 rounded-xl shadow-xl w-full mb-1"
                    placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
                    value={formValues[field]}
                    onChange={handleChange}
                  />
                  {formErrors[field] && (
                    <p className="text-red-500 text-sm">{formErrors[field]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className={`${
                  isLoading ? "bg-orange-400" : "bg-orange-600"
                } text-white p-3 w-full rounded-xl items-center text-center`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Sign up"}
              </button>
            </form>
          )}
          {!isSubmitted && (
            <p className="text-center mt-4">
              Already a member?{" "}
              <Link to="/SignIn" className="text-orange-500">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
