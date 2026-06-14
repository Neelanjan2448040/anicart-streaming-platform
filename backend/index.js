const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient({});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json({ message: "All fields are required" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, name, password: hashedPassword } });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// --- MOVIE ROUTES ---
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({ orderBy: { createdAt: "desc" } });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!movie) return res.status(404).json({ message: "Not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const { title, description, image, videoUrl } = req.body;
    if (!title || !description || !image || !videoUrl) return res.status(400).json({ message: "All fields are required" });

    const movie = await prisma.movie.create({ data: { title, description, image, videoUrl } });
    res.status(201).json({ message: "Movie added", movie });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    await prisma.movie.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

// AI Recommendation Route (Smart Keyword AI)
app.post('/api/recommend', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt required" });

  try {
    const movies = await prisma.movie.findMany();
    
    // Simple Keyword matching NLP logic
    const keywords = prompt.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    let bestMatch = null;
    let maxScore = -1;

    movies.forEach(movie => {
      let score = 0;
      const textToSearch = (movie.title + " " + movie.description).toLowerCase();
      keywords.forEach(kw => {
        if (textToSearch.includes(kw)) score += 1;
      });
      // Add randomness for tie-breakers or broad searches
      score += Math.random() * 0.5;
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = movie;
      }
    });

    res.json({ recommendation: bestMatch });
  } catch (error) {
    res.status(500).json({ message: "Failed to process recommendation" });
  }
});

// --- SERVE FRONTEND (SINGLE LINK ARCHITECTURE) ---
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
