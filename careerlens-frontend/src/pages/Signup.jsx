import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleSignup = async () => {
    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          ✨ Create Account
        </h1>

        <p style={styles.subtitle}>
          Join CareerLens AI
        </p>

        <input
          type="text"
          placeholder="Enter name"
          style={styles.input}
          value={name}
onChange={(e) => setName(e.target.value)}
        />

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
  onClick={handleSignup}
>
          Signup
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
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

export default Signup;