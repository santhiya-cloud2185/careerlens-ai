import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {

      alert("Login failed");

    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          🚀 CareerLens AI
        </h1>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Enter email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
        >
          Login
        </button>

        <p style={styles.text}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    fontFamily: "Arial",
  },

  card: {
    width: "350px",
    background: "rgba(30,41,59,0.7)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0px 0px 30px rgba(0,0,0,0.4)",
  },

  title: {
    color: "white",
    textAlign: "center",
  },

  subtitle: {
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  text: {
    color: "white",
    marginTop: "20px",
    textAlign: "center",
  },

  link: {
    color: "#60a5fa",
    textDecoration: "none",
  },
};

export default Login;