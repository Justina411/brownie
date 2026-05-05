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

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setNewPassword("");
    setInputCode("");
  };

  const handleSendCode = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email);

    if (!user) {
      alert("Email not found. Please sign up first!");
      setIsForgot(false);
      setIsLogin(false);
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);

    alert(`Your verification code is: ${code}`);

    setIsVerifying(true);
    setIsForgot(false);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    if (inputCode === generatedCode) {
      setIsVerifying(false);
      setIsResetting(true);
    } else {
      alert("Invalid code");
    }
  };

  const handleSaveNewPassword = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updated = users.map(u =>
      u.email === email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(updated));

    alert("Password updated!");

    clearInputs();
    setIsResetting(false);
    setIsLogin(true);
  };

  const loginUser = (user) => {
    localStorage.setItem("userSession", "active");
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);

    window.dispatchEvent(new Event("authChange"));

    clearInputs();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (!user) {
        const emailExists = users.find(u => u.email === email);

        if (!emailExists) {
          alert("You need to sign up first");
          setIsLogin(false);
        } else {
          alert("Wrong password");
        }
        return;
      }

      alert(`Welcome back ${user.name}`);

      loginUser(user);

      navigate("/");
    } else {
      const exists = users.find(u => u.email === email);

      if (exists) {
        alert("Account already exists");
        setIsLogin(true);
        return;
      }

      const newUser = { name, email, password };

      const updatedUsers = [...users, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert(`Welcome ${name}`);

      loginUser(newUser);

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#1a0f0d]">

      <div className="flex-1 bg-[#c69a7c] flex justify-center items-center">
        <img src={bag} alt="" className="w-full object-contain" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-white p-10">

        <h2 className="text-3xl font-bold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

          {!isLogin && (
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-4 bg-zinc-900 rounded-xl"
              required
            />
          )}

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-4 bg-zinc-900 rounded-xl"
            required
          />

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-4 bg-zinc-900 rounded-xl"
            required
          />

          <button className="w-full bg-[#c69a7c] text-black py-4 rounded-xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            clearInputs();
          }}
          className="mt-6 text-[#c69a7c] underline text-sm"
        >
          {isLogin ? "Create account" : "Have account? Login"}
        </button>

      </div>
    </div>
  );
};

export default Signin;