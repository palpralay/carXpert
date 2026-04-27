import { signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebaseConfig";

export const ROLE_STORAGE_KEY = "selectedRole";
export const AUTH_USER_STORAGE_KEY = "authUser";

export const setSelectedRole = (role) => {
  localStorage.setItem(ROLE_STORAGE_KEY, role);
};

export const getSelectedRole = () => localStorage.getItem(ROLE_STORAGE_KEY);

const saveUserLocally = (userData) => {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(userData));
};

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const saveUserToFirestore = async (user, role) => {
  const payload = {
    uid: user.uid,
    role,
    name: user.displayName || user.phoneNumber || "CarXpert User",
    phoneNumber: user.phoneNumber || null,
    email: user.email || null,
    updatedAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", user.uid), payload, { merge: true });

  saveUserLocally({
    uid: payload.uid,
    role: payload.role,
    name: payload.name,
  });

  return payload;
};

export const loginWithGoogle = async (role) => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const profile = await saveUserToFirestore(userCredential.user, role);
  return { user: userCredential.user, profile };
};

export const sendOtpToPhone = async (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export const verifyPhoneOtpCode = async (confirmationResult, otpCode, role) => {
  const userCredential = await confirmationResult.confirm(otpCode);
  const profile = await saveUserToFirestore(userCredential.user, role);
  return { user: userCredential.user, profile };
};
