const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const authRoutes = require('./auth');

// registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    // store username and hashedPassword in the db using prisma client
    const newUser = await prisma.instructor.create({
      data: {
        username,
        password: hashedPassword
      }
    });
    res.json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // fetch user by username from db
    const user = await prisma.instructor.findUnique({
      where: { username }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.use(authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});