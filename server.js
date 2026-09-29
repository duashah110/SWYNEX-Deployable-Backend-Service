const express = require("express");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "API key is required"
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      success: false,
      error: "Invalid API key"
    });
  }

  next();
};

// Health check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    message: "SWYNEX API is running successfully"
  });
});

// Get all expenses
app.get("/api/expenses", authenticate, (req, res) => {
  const sql = "SELECT * FROM expenses";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Failed to fetch expenses"
      });
    }

    res.json({
      success: true,
      data: results
    });
  });
});

// Create expense
app.post("/api/expenses", authenticate, (req, res) => {
  const { title, amount, category } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    amount === undefined ||
    amount === null ||
    isNaN(amount) ||
    Number(amount) <= 0 ||
    !category ||
    typeof category !== "string" ||
    category.trim().length < 2
  ) {
    return res.status(400).json({
      success: false,
      error: "Valid title, positive amount, and category are required"
    });
  }

  const sql = `
    INSERT INTO expenses (title, amount, category)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [title.trim(), Number(amount), category.trim()], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Failed to create expense"
      });
    }

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      id: result.insertId
    });
  });
});

// Update expense
app.put("/api/expenses/:id", authenticate, (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    amount === undefined ||
    amount === null ||
    isNaN(amount) ||
    Number(amount) <= 0 ||
    !category ||
    typeof category !== "string" ||
    category.trim().length < 2
  ) {
    return res.status(400).json({
      success: false,
      error: "Valid title, positive amount, and category are required"
    });
  }

  const sql = `
    UPDATE expenses
    SET title = ?, amount = ?, category = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [title.trim(), Number(amount), category.trim(), id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: "Failed to update expense"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Expense not found"
        });
      }

      res.json({
        success: true,
        message: "Expense updated successfully"
      });
    }
  );
});

// Delete expense
app.delete("/api/expenses/:id", authenticate, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM expenses WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: "Failed to delete expense"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Expense not found"
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully"
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});