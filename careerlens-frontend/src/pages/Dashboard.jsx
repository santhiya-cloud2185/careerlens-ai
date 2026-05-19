import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Dashboard() {
  const [file, setFile] = useState(null);

const [result, setResult] = useState("");
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "/";
  }

}, []);
  const name = localStorage.getItem("name");
  const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("name");

  window.location.href = "/";
};

const handleAnalyze = async () => {

  if (!file) {
    alert("Upload resume first");
    return;
  }

  const formData = new FormData();

  formData.append("resume", file);

  try {

    const response = await axios.post(
      "https://careerlens-ai-8la2.onrender.com/analyze-resume",
      formData
    );

    console.log(response.data);

setResult(
  response.data.analysis || "No analysis received"
);

  } catch (error) {

    alert("Analysis failed");

  }
};
  return (
    
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🚀 CareerLens AI</h2>

        <button style={styles.menuButton}>
          Dashboard
        </button>

        <input
  type="file"
  accept=".pdf"
  onChange={(e) => setFile(e.target.files[0])}
  style={styles.input}
/>

        <button
  style={styles.analyzeButton}
  onClick={handleAnalyze}
>
  Start Analysis
</button>
{result && (
  <div style={styles.resultBox}>
    <h3>Resume Text</h3>

    <pre style={styles.preText}>
  {result}
</pre>
  </div>
)}

        <button style={styles.menuButton}>
          History
        </button>

        <button
  style={styles.logoutButton}
  onClick={handleLogout}
>
  Logout
</button>
      </div>

      <div style={styles.main}>
        <h1 style={styles.title}>
         Welcome Back, {name} 👋
        </h1>

        <p style={styles.subtitle}>
          Upload your resume and get AI-powered career insights
        </p>

        <div style={styles.uploadCard}>
          <h2 style={styles.cardTitle}>
            📄 Resume Analyzer
          </h2>

          <p style={styles.cardText}>
            Analyze ATS score, missing skills,
            and career suggestions instantly.
          </p>

          <button style={styles.analyzeButton}>
            Start Analysis
          </button>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statsCard}>
            <h2>12</h2>
            <p>Analyses Done</p>
          </div>

          <div style={styles.statsCard}>
            <h2>85%</h2>
            <p>Average ATS Score</p>
          </div>

          <div style={styles.statsCard}>
            <h2>5</h2>
            <p>Skills Improved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "250px",
    background: "rgba(15,23,42,0.9)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
  },

  logo: {
    color: "white",
    marginBottom: "30px",
  },

  menuButton: {
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#1e293b",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
  },

  logoutButton: {
    marginTop: "auto",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },

  main: {
    flex: 1,
    padding: "40px",
    color: "white",
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "40px",
  },

  uploadCard: {
    background: "rgba(30,41,59,0.7)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "20px",
    marginBottom: "40px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
  },

  cardTitle: {
    marginBottom: "15px",
  },

  cardText: {
    color: "#cbd5e1",
    marginBottom: "20px",
  },

  analyzeButton: {
    padding: "15px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  statsCard: {
    flex: "1",
    minWidth: "200px",
    background: "rgba(30,41,59,0.7)",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
  },
  input: {
  marginBottom: "20px",
  color: "white",
},

resultBox: {
  marginTop: "30px",
  background: "#0f172a",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
},
preText: {
  whiteSpace: "pre-wrap",
  lineHeight: "1.8",
  fontSize: "15px",
},
};

export default Dashboard;