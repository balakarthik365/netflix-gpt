import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [showHelper, setShowHelper] = useState(false); // State for the "Get Help" accordion
  const [email, setEmail] = useState(""); // State for the email input value
  const [validationError, setValidationError] = useState(""); // State for validation error message

  const showHelperHandler = () => setShowHelper(!showHelper);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const validateInput = (value) => {
    if (!value.trim()) {
      return "ⓧ Please enter a valid email or mobile number.";
    }

    // Basic email validation regex
    // This regex checks for a string that looks like an email (e.g., user@domain.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Basic 10-digit mobile number validation regex (common in many regions like India)
    const mobileRegex = /^\d{10}$/;

    if (emailRegex.test(value) || mobileRegex.test(value)) {
      return ""; // Valid email or mobile number
    } else {
      return "ⓧ Please enter a valid email or mobile number."; // Neither valid email nor mobile
    }
  };

  const handleEmailBlur = () => {
    setValidationError(validateInput(email));
  };

  return (
    <div className="relative bg-gradient-to-b from-[#520707] to-black min-h-screen">
      <div className="border border-b-gray-600 pt-1 pb-3 px-39">
        <Header />
      </div>
      <div className="absolute w-[450px] mx-auto my-8 right-0 left-0">
        <form>
          <p className="font-bold text-[32px] text-white">
            Enter your info to sign in
          </p>
          <p className="text-gray-400 text-xl mt-1 mb-5">
            Or get started with a new account.
          </p>

          {/* Floating Label Input */}
          <div className="relative mb-1">
            <input
              type="text"
              id="email-input" // Added ID for the label
              className={`peer text-[16px] border-2 rounded-sm text-gray-200 p-3 pt-6 w-full object-cover bg-gray-800 focus:outline-none ${
                validationError
                  ? "border-red-500"
                  : "border-gray-400 focus:border-white"
              }`}
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur} // Add onBlur handler to trigger validation when input loses focus
              placeholder=" " // Important: placeholder must not be empty for peer-not-placeholder-shown to work
            />
            <label
              htmlFor="email-input"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base transition-all duration-200 pointer-events-none
                         peer-focus:top-2 peer-focus:text-[16px] peer-focus:text-white peer-focus:scale-75 peer-focus:translate-y-0 origin-top-left
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[16px] peer-not-placeholder-shown:text-white peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:translate-y-0 origin-top-left"
            >
              Email or Mobile number
            </label>
            {validationError && (
              <p className="text-red-500 text-sm mt-1">{validationError}</p>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-red-800 text-white p-3 mt-2 rounded-sm text-xl font-semibold cursor-pointer hover:bg-red-600 transition-all duration-200"
          >
            Continue
          </button>
          <div
            className="flex items-center gap-2 text-white mt-8 transition-all duration-200 cursor-pointer"
            onClick={showHelperHandler}
          >
            <span>Get Help</span>
            {showHelper ? (
              <span className="text-md">▲</span>
            ) : (
              <span className="text-md">▼</span>
            )}
          </div>
          {showHelper && (
            <div className="mt-1 text-sm text-white">
              <p className="mb-0.5 cursor-pointer underline">
                Forgot email or mobile number?
              </p>
              <p className="cursor-pointer underline">
                {" "}
                Learn more about sign-in
              </p>
            </div>
          )}
          <p className="mt-6">
            <span className="text-gray-300 text-xs">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </span>
            <p className="text-white cursor-pointer">Learn more</p>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
