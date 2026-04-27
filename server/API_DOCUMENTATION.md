# CarXpert Backend API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication Endpoints

### 1. Register (Email & Password)
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "role": "customer",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "user": {
    "_id": "userid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer",
    "phoneNumber": "+1234567890",
    "authProvider": "email",
    "isVerified": false,
    "createdAt": "2026-04-27T...",
    "updatedAt": "2026-04-27T..."
  },
  "token": "jwt_token_here"
}
```

---

### 2. Login (Email & Password)
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "user": { /* user object */ },
  "token": "jwt_token_here"
}
```

---

### 3. Firebase Login (from frontend Firebase auth)
**POST** `/auth/firebase-login`

**Request Body:**
```json
{
  "uid": "firebase-uid-from-auth",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "customer",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Firebase login successful.",
  "user": { /* user object */ },
  "token": "jwt_token_here"
}
```

---

### 4. Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer jwt_token_here
```
or
```
Cookie: authToken=jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": { /* user object */ }
}
```

---

### 5. Verify Token
**GET** `/auth/verify-token`

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid.",
  "user": {
    "userId": "userid",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

---

### 6. Logout
**POST** `/auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful."
}
```

---

## User Schema

```javascript
{
  uid: String,                    // Firebase UID (optional)
  email: String,                  // User email
  password: String,               // Hashed password (not included in responses)
  phoneNumber: String,            // Phone number
  name: String,                   // Full name (required)
  role: String,                   // "customer" or "mechanic" (required)
  isVerified: Boolean,            // Email/Phone verification status
  authProvider: String,           // "email", "phone", or "firebase"
  profileImage: String,           // URL to profile image
  bio: String,                    // User bio
  createdAt: Date,                // Account creation timestamp
  updatedAt: Date                 // Last update timestamp
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email and password are required."
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "User already exists with this email or phone number."
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error logging in.",
  "error": "error details"
}
```

---

## Frontend Integration

### 1. After Firebase Login (in frontend)
Send user data to backend:

```javascript
const response = await fetch('http://localhost:4000/api/auth/firebase-login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    role: selectedRole,
    phoneNumber: firebaseUser.phoneNumber
  })
});

const data = await response.json();
localStorage.setItem('backendAuthToken', data.token);
```

### 2. Use Token in API Requests
```javascript
const token = localStorage.getItem('backendAuthToken');

fetch('http://localhost:4000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include'
});
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Variables
Update `.env`:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=4000
NODE_ENV=development
```

### 3. Start Server
```bash
npm run dev
# or
node server.js
```

---

## Notes

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire in 7 days (configurable via JWT_EXPIRE)
- Tokens are stored in httpOnly cookies and can be sent via Authorization header
- Firebase users skip password validation
- Role-based access control: "customer" or "mechanic"
