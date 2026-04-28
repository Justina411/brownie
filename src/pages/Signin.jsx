import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bag from "../assets/modelbg.png";

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

  const handleSendCode = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");

    if (email === storedEmail) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      alert(`Your verification code is: ${code}`);
      setIsVerifying(true);
      setIsForgot(false);
    } else {
      alert("Email not found. Please sign up!");
      setIsForgot(false);
      setIsLogin(false);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (inputCode === generatedCode) {
      setIsVerifying(false);
      setIsResetting(true);
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  const handleSaveNewPassword = (e) => {
    e.preventDefault();
    localStorage.setItem("userPassword", newPassword);
    alert("Password updated successfully! Please login.");
    setIsResetting(false);
    setIsLogin(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (isLogin) {
      // 🔐 LOGIN
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("userSession", "active");
        localStorage.setItem("userName", storedEmail.split("@")[0]); // fallback if name missing

        // 🔥 notify Navbar instantly
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
        alert("Account not recognized. Please check your details or Sign Up!");
      }

    } else {
      // 🆕 SIGN UP
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userName", name);
      localStorage.setItem("userSession", "active");

      alert(`Welcome ${name}! Account created.`);

      // 🔥 notify Navbar instantly
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
          
          {!isLogin && !isForgot && !isVerifying && !isResetting && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          
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

          {isVerifying && (
            <input
              className="w-full p-4 bg-zinc-900 rounded-xl text-center tracking-[1em]"
              placeholder="0000"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              required
            />
          )}

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

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setIsForgot(false);
            setIsVerifying(false);
            setIsResetting(false);
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