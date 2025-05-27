import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../config'; // ✅ đúng


const LoginRegister = ({ setUser }) => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const [regInfo, setRegInfo] = useState({
    login_name: "",
    password: "",
    confirm: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ login_name: loginName, password }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUser(data);
      navigate(`/users/${data._id}`);
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleRegister = async () => {
    const { password, confirm, first_name, login_name } = regInfo;
    if (password !== confirm) {
      return setError("Passwords do not match");
    }
    if (!first_name || !password || !login_name) {
      return setError("Please fill required fields");
    }

    try {
      const res = await fetch(`${BASE_URL}/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(regInfo),
      });

      if (!res.ok) throw new Error(await res.text());
      alert("Registered successfully. Please login.");
      setRegInfo({
        login_name: "",
        password: "",
        confirm: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
      });
    } catch (err) {
      setError("Register failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input
        placeholder="Login name"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Register</h2>
      <input
        placeholder="Login name"
        value={regInfo.login_name}
        onChange={(e) =>
          setRegInfo({ ...regInfo, login_name: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={regInfo.password}
        onChange={(e) =>
          setRegInfo({ ...regInfo, password: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={regInfo.confirm}
        onChange={(e) =>
          setRegInfo({ ...regInfo, confirm: e.target.value })
        }
      />
      <input
        placeholder="First name"
        value={regInfo.first_name}
        onChange={(e) =>
          setRegInfo({ ...regInfo, first_name: e.target.value })
        }
      />
      <input
        placeholder="Last name"
        value={regInfo.last_name}
        onChange={(e) =>
          setRegInfo({ ...regInfo, last_name: e.target.value })
        }
      />
      <input
        placeholder="Location"
        value={regInfo.location}
        onChange={(e) =>
          setRegInfo({ ...regInfo, location: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={regInfo.description}
        onChange={(e) =>
          setRegInfo({ ...regInfo, description: e.target.value })
        }
      />
      <input
        placeholder="Occupation"
        value={regInfo.occupation}
        onChange={(e) =>
          setRegInfo({ ...regInfo, occupation: e.target.value })
        }
      />
      <button onClick={handleRegister}>Register Me</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginRegister;
