import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  membershipPlan: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export default User
