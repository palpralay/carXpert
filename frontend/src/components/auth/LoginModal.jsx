import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RecaptchaVerifier } from "firebase/auth";
import { UserRound, Wrench, UserPlus, Phone, Mail } from "lucide-react";
import { auth } from "../../firebase/firebaseConfig";
import {
  getSelectedRole,
  loginWithGoogle,
  sendOtpToPhone,
  setSelectedRole,
  verifyPhoneOtpCode,
} from "../../firebase/authService";
import backendAuthService from "../../services/backendAuth";

const roleMeta = {
  customer: {
    label: "Customer",
    redirectPath: "/customer-dashboard",
  },
  mechanic: {
    label: "Mechanic",
    redirectPath: "/mechanic-dashboard",
  },
};

const LoginModal = ({ isOpen, onClose, onAuthenticated }) => {
  const [view, setView] = useState("role");
  const [role, setRole] = useState(getSelectedRole() || "");
  const [isCreateFlow, setIsCreateFlow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaVerifierRef = useRef(null);

  const heading = useMemo(() => {
    if (view === "role") {
      return "Choose how you want to continue";
    }

    if (isCreateFlow) {
      return `Create ${roleMeta[role]?.label || ""} account`;
    }

    return `Login as ${roleMeta[role]?.label || ""}`;
  }, [isCreateFlow, role, view]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setErrorMessage("");
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, []);

  const resetFlow = () => {
    setView("role");
    setIsCreateFlow(false);
    setPhoneNumber("");
    setOtpCode("");
    setConfirmationResult(null);
    setErrorMessage("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  const startRoleFlow = (nextRole, shouldCreate) => {
    setSelectedRole(nextRole);
    setRole(nextRole);
    setIsCreateFlow(shouldCreate);
    setView("auth");
    setErrorMessage("");
  };

  const ensureRecaptcha = () => {
    if (recaptchaVerifierRef.current) {
      return recaptchaVerifierRef.current;
    }

    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    return recaptchaVerifierRef.current;
  };

  const finishAuth = (authenticatedRole) => {
    resetFlow();
    onAuthenticated(roleMeta[authenticatedRole].redirectPath);
    onClose();
  };

  const handleGoogleLogin = async () => {
    if (!role) {
      setErrorMessage("Please choose a role to continue.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const firebaseUser = await loginWithGoogle(role);
      
      // Sync user to backend and get JWT token
      await backendAuthService.firebaseLogin(firebaseUser, role);
      finishAuth(role);
    } catch (error) {
      setErrorMessage(error?.message || "Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber.trim()) {
      setErrorMessage("Please enter a valid phone number with country code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const verifier = ensureRecaptcha();
      const result = await sendOtpToPhone(phoneNumber, verifier);
      setConfirmationResult(result);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to send OTP right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) {
      setErrorMessage("Please request OTP before verifying.");
      return;
    }

    if (!otpCode.trim()) {
      setErrorMessage("Enter the OTP code you received.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { user: firebaseUser } = await verifyPhoneOtpCode(confirmationResult, otpCode, role);
      
      // Sync user to backend and get JWT token
      await backendAuthService.firebaseLogin(firebaseUser, role, phoneNumber);
      finishAuth(role);
    } catch (error) {
      setErrorMessage(error?.message || "OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  CarXpert Access
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{heading}</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            {view === "role" && (
              <div className="space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => startRoleFlow("customer", false)}
                >
                  <span className="flex items-center gap-3">
                    <UserRound className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-slate-800">Login as Customer</span>
                  </span>
                  <span className="text-slate-400">&gt;</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => startRoleFlow("mechanic", false)}
                >
                  <span className="flex items-center gap-3">
                    <Wrench className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-slate-800">Login as Mechanic</span>
                  </span>
                  <span className="text-slate-400">&gt;</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => setView("create-role")}
                >
                  <span className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5 text-indigo-600" />
                    <span className="font-semibold text-slate-800">Create Account</span>
                  </span>
                  <span className="text-slate-400">&gt;</span>
                </button>
              </div>
            )}

            {view === "create-role" && (
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => startRoleFlow("customer", true)}
                >
                  Create Customer Account
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => startRoleFlow("mechanic", true)}
                >
                  Create Mechanic Account
                </button>
                <button
                  type="button"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                  onClick={() => setView("role")}
                >
                  Back
                </button>
              </div>
            )}

            {view === "auth" && (
              <div className="space-y-4">
                <button
                  type="button"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleGoogleLogin}
                >
                  <Mail className="h-4 w-4" />
                  {isCreateFlow ? "Continue with Google" : "Login with Google"}
                </button>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    {isCreateFlow ? "Create with Phone OTP" : "Login with Phone OTP"}
                  </p>
                  <div className="space-y-3">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring"
                    />

                    {!confirmationResult && (
                      <button
                        type="button"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={handleSendOtp}
                      >
                        <Phone className="h-4 w-4" />
                        Send OTP
                      </button>
                    )}

                    {confirmationResult && (
                      <>
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(event) => setOtpCode(event.target.value)}
                          placeholder="Enter OTP"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 transition focus:ring"
                        />
                        <button
                          type="button"
                          disabled={isLoading}
                          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={handleVerifyOtp}
                        >
                          Verify OTP
                        </button>
                      </>
                    )}
                  </div>
                  <div id="recaptcha-container" />
                </div>

                <button
                  type="button"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                  onClick={() => setView("role")}
                >
                  Back to role selection
                </button>
              </div>
            )}

            {isLoading && (
              <p className="mt-4 text-sm font-medium text-slate-500">Processing...</p>
            )}

            {errorMessage && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
