import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          setUser(null)
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
