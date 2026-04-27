const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// Register with Email & Password
exports.register = async (req, res) => {
  try {
    const { email, password, name, role, phoneNumber } = req.body;

    // Validate input
    if (!email || !password || !name || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, name, and role are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or phone number.",
      });
    }

    // Create new user
    const newUser = new User({
      email,
      password,
      name,
      role,
      phoneNumber: phoneNumber || null,
      authProvider: "email",
      isVerified: false,
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser.toJSON(),
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user.",
      error: error.message,
    });
  }
};

// Login with Email & Password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in.",
      error: error.message,
    });
  }
};

// Login with Firebase UID (from frontend Firebase auth)
exports.firebaseLogin = async (req, res) => {
  try {
    const { uid, email, name, role, phoneNumber } = req.body;

    // Validate input
    if (!uid || !name || !role) {
      return res.status(400).json({
        success: false,
        message: "UID, name, and role are required.",
      });
    }

    // Check if user exists by Firebase UID
    let user = await User.findOne({ uid });

    if (!user) {
      // Create new user from Firebase auth
      user = new User({
        uid,
        email: email || null,
        phoneNumber: phoneNumber || null,
        name,
        role,
        authProvider: "firebase",
        isVerified: true, // Firebase handles verification
      });

      await user.save();
    } else {
      // Update existing user data
      user.name = name;
      user.role = role;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      await user.save();
    }

    // Generate token for backend API access
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Firebase login successful.",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with Firebase login.",
      error: error.message,
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user.",
      error: error.message,
    });
  }
};

// Logout
exports.logout = (req, res) => {
  try {
    res.clearCookie("authToken");

    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out.",
      error: error.message,
    });
  }
};

// Verify Token
exports.verifyToken = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Token is valid.",
      user: req.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token.",
      error: error.message,
    });
  }
};
