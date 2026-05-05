import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // This is the name we want to show
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (isLogin) {
      // LOGIN LOGIC
      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("userSession", "active");
        // Dispatch custom event to tell Navbar to refresh immediately
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      } else {
        alert("Invalid credentials. Please sign up if you don't have an account.");
      }
    } else {
      // SIGN UP LOGIC
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      // THE FIX: Specifically saving 'name' to 'userName'
      localStorage.setItem("userName", name); 
      alert("Account created! Please log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h2 className="text-3xl font-bold text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        )}
        
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button className="w-full bg-amber-800 text-white py-3 rounded-lg font-bold">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Signin;