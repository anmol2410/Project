import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  const handleDownload = async () => {
    if (!url) {
      alert("Please enter a YouTube URL.");
      return;
    }

    try {
      const response = await fetch("https://project-0gd6.onrender.com/download", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download video");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "video.mp4"; // Default name; can be customized
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      alert("Video downloaded successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          <span style={styles.red}>YouTube</span> Video Downloader
        </h1>
        <p style={styles.subtitle}>
          Download any YouTube video quickly and easily!
        </p>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleDownload} style={styles.button}>
            Get Video
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#181818",
  },
  content: {
    background: "#202020",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "80%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
  },
  red: {
    color: "#FF0000",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  input: {
    flex: "1",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #444",
    borderRadius: "5px",
    backgroundColor: "#121212",
    color: "#fff",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#FF0000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;