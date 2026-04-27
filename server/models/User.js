const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      sparse: true,
      trim: true,
    },
    email: {
      type: String,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "mechanic"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    authProvider: {
      type: String,
      enum: ["email", "phone", "firebase"],
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to get safe user data (without password)
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
