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

  // ✅ GET ALL USERS
  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  // ✅ SAVE USERS
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // ✅ SEND RESET CODE
  const handleSendCode = (e) => {
    e.preventDefault();

    const users = getUsers();

    const foundUser = users.find(
      (user) => user.email === email
    );

    if (foundUser) {

      const code = Math.floor(
        1000 + Math.random() * 9000
      ).toString();

      setGeneratedCode(code);

      alert(`Your verification code is: ${code}`);

      setIsVerifying(true);
      setIsForgot(false);

    } else {

      alert("Email not found. Please sign up first!");

      setIsForgot(false);
      setIsLogin(false);

      clearInputs();
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

    const users = getUsers();

    const updatedUsers = users.map((user) =>
      user.email === email
        ? { ...user, password: newPassword }
        : user
    );

    saveUsers(updatedUsers);

    alert("Password updated successfully! Please login.");

    setIsResetting(false);
    setIsLogin(true);

    clearInputs();
  };

  // ✅ LOGIN + SIGNUP
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = getUsers();

    // ================= LOGIN =================
    if (isLogin) {

      const foundUser = users.find(
        (user) =>
          user.email === email &&
          user.password === password
      );

      // ❌ USER NOT FOUND
      if (!foundUser) {

        alert("Account not found. Please sign up first!");

        setIsLogin(false);

        clearInputs();

        return;
      }

      // ✅ LOGIN SUCCESS
      localStorage.setItem("userSession", "active");

      localStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
      );

      // 🔥 notify navbar instantly
      window.dispatchEvent(new Event("authChange"));

      alert(`Welcome back ${foundUser.name}!`);

      clearInputs();

      const pendingBag = localStorage.getItem("pendingBag");

      if (pendingBag) {

        const bagData = JSON.parse(pendingBag);

        localStorage.removeItem("pendingBag");

        navigate("/shop", { state: bagData });

      } else {

        navigate("/");
      }
    }

    // ================= SIGN UP =================
    else {

      const existingUser = users.find(
        (user) => user.email === email
      );

      // ❌ ACCOUNT EXISTS
      if (existingUser) {

        alert("Account already exists. Please login!");

        setIsLogin(true);

        clearInputs();

        return;
      }

      // ✅ CREATE USER
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
      };

      const updatedUsers = [...users, newUser];

      saveUsers(updatedUsers);

      localStorage.setItem("userSession", "active");

      localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
      );

      // 🔥 notify navbar instantly
      window.dispatchEvent(new Event("authChange"));

      alert(`Welcome ${name}! Account created successfully.`);

      clearInputs();

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
          {!isLogin &&
            !isForgot &&
            !isVerifying &&
            !isResetting && (
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
          {!isForgot &&
            !isVerifying &&
            !isResetting && (
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
          {isLogin &&
            !isForgot &&
            !isVerifying &&
            !isResetting && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgot(true);
                    clearInputs();
                  }}
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