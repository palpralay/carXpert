// Backend authentication service - handles calls to Node/Express API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const backendAuthService = {
  // Sync Firebase user to backend and get JWT token
  async firebaseLogin(firebaseUser, role, phoneNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/firebase-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          role: role,
          phoneNumber: phoneNumber || '',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Firebase login failed');
      }

      // Store backend auth token
      if (data.token) {
        localStorage.setItem('backendAuthToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Backend Firebase login error:', error);
      throw error;
    }
  },

  // Email & Password Registration
  async register(email, password, name, role, phoneNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          phoneNumber: phoneNumber || '',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.token) {
        localStorage.setItem('backendAuthToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Email & Password Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        localStorage.setItem('backendAuthToken', data.token);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Get current authenticated user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('backendAuthToken');

      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch user');
      }

      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Verify token validity
  async verifyToken() {
    try {
      const token = localStorage.getItem('backendAuthToken');

      if (!token) {
        return { valid: false };
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      return { valid: data.success, data };
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  },

  // Logout
  async logout() {
    try {
      const token = localStorage.getItem('backendAuthToken');

      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
      });

      const data = await response.json();

      // Clear local storage
      localStorage.removeItem('backendAuthToken');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedRole');

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API call fails
      localStorage.removeItem('backendAuthToken');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedRole');
      throw error;
    }
  },

  // Get stored auth token
  getToken() {
    return localStorage.getItem('backendAuthToken');
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
};

export default backendAuthService;
