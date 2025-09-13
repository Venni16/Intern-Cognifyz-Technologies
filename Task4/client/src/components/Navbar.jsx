import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              FitTrack TN
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
