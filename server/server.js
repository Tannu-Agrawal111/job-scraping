import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./secure.env" });  // .env file load karega

const app = express();
app.use(cors());

// Jobs API endpoint
app.get("/api/jobs", async (req, res) => {
  try {
    const { query, remote, type, city } = req.query;

    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: query || "developer",
        remote_jobs_only: remote || "false",
        employment_types: type || "",
        location: city || "India",
        page: 1,
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// app.listen(5000, () => console.log("✅ Server running on port 5000"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
