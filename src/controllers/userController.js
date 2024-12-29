const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();

const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const db = req.db;

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashedPassword, role });
    const result = await db.collection('users').insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Registration failed');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = req.db;

    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid email or password');

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed');
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const db = req.db;

    const user = await db.collection('users').findOne(
      { _id: new (require('mongodb').ObjectId)(userId) },
      { projection: { password: 0, createdAt: 0 } }
    );

    if (!user) return res.status(404).send('User not found');

    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Failed to fetch user profile');
  }
};

module.exports = { getUserProfile, register, login };
