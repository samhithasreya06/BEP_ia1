const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Body parsers
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// In-memory storage (temporary)
let submissions = [];

// Serve form file
app.use(express.static(path.join(__dirname, "public")));

// POST route to accept form / Postman submission
app.post("/submit-form", (req, res) => {
  const data = {
    id: submissions.length + 1,
    time: new Date().toISOString(),
    body: req.body
  };

  submissions.push(data);

  res.status(201).json({
    message: "Form received 🎉",
    saved: data
  });
});

// GET route to see all submissions
app.get("/submissions", (req, res) => {
  res.json(submissions);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
