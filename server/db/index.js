const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

// endpoint using direct SQL queries
app.get("/api/students", async (req, res) => {
  try {
    const students = await query("SELECT * FROM students");
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// endpoint using Prisma Client
app.get("/api/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// update other endpoints - Prisma Client

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});