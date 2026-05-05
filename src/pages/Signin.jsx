import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bag from "../../public/modelbg.png";

const Signin = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // ✅ CLEAR INPUTS
  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setNewPassword("");
    setInputCode("");
  };

  // ✅ SEND RESET CODE
  const handleSendCode = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();

      setGeneratedCode(code);

      alert(`Your verification code is: ${code}`);

      setIsVerifying(true);
      setIsForgot(false);

    } else {
      alert("Email not found. Please sign up first!");
      setIsForgot(false);
      setIsLogin(false);
    }
  };

  // ✅ VERIFY CODE
  const handleVerifyCode = (e) => {
    e.preventDefault();

    if (inputCode === generatedCode) {
      setIsVerifying(false);
      setIsResetting(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  // ✅ SAVE NEW PASSWORD
  const handleSaveNewPassword = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, password: newPassword }
        : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password updated successfully! Please login.");

    clearInputs();

    setIsResetting(false);
    setIsLogin(true);
  };

  // ✅ LOGIN + SIGNUP
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      // ✅ LOGIN
      const existingUser = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      if (existingUser) {

        // ✅ STORE SESSION
        localStorage.setItem("userSession", "active");

        // ✅ STORE CURRENT USER DETAILS
        localStorage.setItem("userName", existingUser.name);
        localStorage.setItem("userEmail", existingUser.email);

        // ✅ WELCOME USER WITH STORED NAME
        alert(`Welcome back ${existingUser.name}!`);

        // ✅ CLEAR INPUTS
        clearInputs();

        // ✅ UPDATE NAVBAR
        window.dispatchEvent(new Event("authChange"));

        const pendingBag = localStorage.getItem("pendingBag");

        if (pendingBag) {
          const bagData = JSON.parse(pendingBag);

          localStorage.removeItem("pendingBag");

          navigate("/shop", { state: bagData });

        } else {
          navigate("/");
        }

      } else {
        // ❌ USER NOT FOUND
        const emailExists = users.find(
          (user) => user.email === email
        );

        if (!emailExists) {
          alert("You have not signed up yet. Please create an account first!");
          setIsLogin(false);
        } else {
          alert("Incorrect password.");
        }
      }

    } else {
      // ✅ SIGN UP
      const existingUser = users.find(
        (user) => user.email === email
      );

      if (existingUser) {
        alert("Account already exists. Please login!");
        setIsLogin(true);
        return;
      }

      // ✅ CREATE NEW USER
      const newUser = {
        name,
        email,
        password
      };

      // ✅ SAVE USER
      const updatedUsers = [...users, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // ✅ SAVE SESSION
      localStorage.setItem("userSession", "active");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);

      // ✅ WELCOME NEW USER
      alert(`Welcome ${name}! Account created successfully.`);

      // ✅ CLEAR INPUTS
      clearInputs();

      // ✅ UPDATE NAVBAR
      window.dispatchEvent(new Event("authChange"));

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#1a0f0d]">

      {/* LEFT SIDE */}
      <div className="flex-1 bg-[#c69a7c] flex flex-col justify-center items-center relative overflow-hidden">
        <h1 className="absolute top-10 text-4xl font-black text-[#2f1f1a] uppercase tracking-tighter z-10">
          Brownie
        </h1>

        <img
          src={bag}
          alt="Bag"
          className="h-full w-full object-contain object-right mix-blend-multiply translate-x-5"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col justify-center items-center p-10 text-white">

        <h2 className="text-3xl font-bold mb-6 uppercase">
          {isVerifying
            ? "Enter Code"
            : isResetting
            ? "New Password"
            : isForgot
            ? "Forgot Password"
            : isLogin
            ? "Log In"
            : "Sign Up"}
        </h2>

        <form
          onSubmit={
            isVerifying
              ? handleVerifyCode
              : isResetting
              ? handleSaveNewPassword
              : isForgot
              ? handleSendCode
              : handleSubmit
          }
          className="w-full max-w-md space-y-4"
        >

          {/* FULL NAME */}
          {!isLogin && !isForgot && !isVerifying && !isResetting && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          {/* EMAIL */}
          {!isVerifying && !isResetting && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          {/* VERIFY CODE */}
          {isVerifying && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl text-center tracking-[1em]"
              placeholder="0000"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              required
            />
          )}

          {/* NEW PASSWORD */}
          {isResetting && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          )}

          {/* PASSWORD */}
          {!isForgot && !isVerifying && !isResetting && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          {/* FORGOT PASSWORD */}
          {isLogin && !isForgot && !isVerifying && !isResetting && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsForgot(true)}
                className="text-xs text-[#c69a7c]"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* BUTTON */}
          <button className="w-full bg-[#c69a7c] text-black font-bold py-4 rounded-xl">
            {isVerifying
              ? "Verify Code"
              : isResetting
              ? "Update Password"
              : isForgot
              ? "Send Reset Code"
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </button>
        </form>

        {/* TOGGLE */}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setIsForgot(false);
            setIsVerifying(false);
            setIsResetting(false);

            clearInputs();
          }}
          className="mt-6 text-[#c69a7c] text-xs underline"
        >
          {isForgot || isVerifying || isResetting
            ? "Back to Login"
            : isLogin
            ? "Need an account? Sign Up"
            : "Have an account? Log In"}
        </button>

      </div>
    </div>
  );
};

export default Signin;