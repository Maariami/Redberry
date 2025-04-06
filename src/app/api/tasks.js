// pages/api/tasks.js
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:3000", // Allow requests from this frontend (adjust as needed)
  allowedHeaders: "Content-Type, Authorization",
});

// Helper method to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// API Route
export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    // Handle POST request here
    const taskData = req.body; // Assuming your frontend sends task data here
    res
      .status(200)
      .json({ message: "Task created successfully!", data: taskData });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
