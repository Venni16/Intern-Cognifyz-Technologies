import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import authMiddleware from '../middleware/auth.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  const { fullName, email, age, password, city, membershipPlan } = req.body

  if (!fullName || !email || !age || !password || !city || !membershipPlan) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (age < 16) {
    return res.status(400).json({ message: 'Age must be at least 16' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      fullName,
      email,
      age,
      password: hashedPassword,
      city,
      membershipPlan,
    })

    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(201).json({ token, user: { fullName, email, age, city, membershipPlan } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.json({ token, user: { fullName: user.fullName, email: user.email, age: user.age, city: user.city, membershipPlan: user.membershipPlan } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
