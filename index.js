import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmailSender from "./sendEmail.js";

dotenv.config();

const app = express();

// Enable all CORS requests
app.use(cors());

// Parse JSON requests
app.use(express.json());

const port = process.env.PORT || 5050;

// CORS preflight middleware
app.options("/api", cors());

app.post("/api", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Assuming EmailSender returns a promise
    await EmailSender({ fullName, email, phone, message });

    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error ❌" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
