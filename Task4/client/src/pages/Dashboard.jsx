import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Dashboard = () => {
  const { user, loading, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup')
    }
  }, [loading, user, navigate])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  const renewalDate = new Date()
  switch (user.membershipPlan) {
    case 'basic':
      renewalDate.setMonth(renewalDate.getMonth() + 1)
      break
    case 'standard':
      renewalDate.setMonth(renewalDate.getMonth() + 3)
      break
    case 'premium':
      renewalDate.setFullYear(renewalDate.getFullYear() + 1)
      break
    default:
      break
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-4 text-primary">Welcome, {user.fullName}!</h2>
        <p className="mb-2">Membership Plan: <strong>{user.membershipPlan.charAt(0).toUpperCase() + user.membershipPlan.slice(1)}</strong></p>
        <p className="mb-2">City: <strong>{user.city}</strong></p>
        <p className="mb-6">Renewal Date: <strong>{renewalDate.toDateString()}</strong></p>
        <button
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
