import { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  const { addToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: JSON.parse(user),
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const data = await authService.login(email, password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data,
      });

      addToast('Login successful', 'success');
      
      return data;
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const data = await authService.register(name, email, password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data,
      });

      addToast('Account created successfully', 'success');
      
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'REGISTER_ERROR',
        payload: errorMessage,
      });
      if (errorMessage === 'User already exists') {
        addToast('Account already exists', 'error');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    addToast('Logout successful', 'success');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
