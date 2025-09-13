import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy']
const plans = [
  { id: 'basic', name: 'Basic (Monthly)', price: '₹999/month' },
  { id: 'standard', name: 'Standard (Quarterly)', price: '₹2,499/3 months' },
  { id: 'premium', name: 'Premium (Yearly)', price: '₹7,999/year (includes free personal trainer)' },
]

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    city: '',
    membershipPlan: '',
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === 'password') {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (formData.age < 16) newErrors.age = 'Age must be at least 16'
    if (passwordStrength < 4) newErrors.password = 'Password must be at least 8 chars, 1 uppercase, 1 number, 1 special character'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.membershipPlan) newErrors.membershipPlan = 'Membership plan is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const res = await axios.post('/api/auth/register', formData)
        login(res.data.token, res.data.user)
        navigate('/dashboard')
      } catch (err) {
        setErrors({ general: err.response?.data?.message || 'Signup failed' })
      }
    }
  }

  const selectedPlan = plans.find(p => p.id === formData.membershipPlan)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength === 1 ? 'bg-red-500' :
                    passwordStrength === 2 ? 'bg-yellow-500' :
                    passwordStrength === 3 ? 'bg-blue-500' :
                    passwordStrength === 4 ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                ></div>
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select City</option>
              {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Membership Plan</label>
            <select
              name="membershipPlan"
              value={formData.membershipPlan}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Plan</option>
              {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
            </select>
            {errors.membershipPlan && <p className="text-red-500 text-sm">{errors.membershipPlan}</p>}
          </div>
          {selectedPlan && (
            <div className="mb-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold">{selectedPlan.name}</h3>
              <p>{selectedPlan.price}</p>
              {selectedPlan.id === 'premium' && (
                <p className="text-green-600">Free Personal Trainer Included in Tamil Nadu Branches</p>
              )}
            </div>
          )}
          {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-green-600 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
