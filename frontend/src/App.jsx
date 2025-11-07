import { useCallback, useEffect, useMemo, useState } from "react";
import AuthHeader from "./components/AuthHeader";
import GoogleLoginButton from "./components/GoogleLoginButton";
import ProfileCard from "./components/ProfileCard";
import { Shield } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("auth_token") || "");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) return;
    try {
      const u = JSON.parse(localStorage.getItem("auth_user") || "null");
      if (u) setUser(u);
    } catch {}
  }, [token]);

  const handleGoogleCredential = useCallback(async (credential) => {
    try {
      setStatus("Signing in...");
      const res = await fetch(`${BACKEND_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setStatus("Signed in");
    } catch (e) {
      console.error(e);
      setStatus("Login error");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken("");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setStatus("Signed out");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <AuthHeader user={user} onLoginClick={() => {}} onLogout={logout} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <section className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to PixelShare</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sign in with your Google account to create your personal space for photos. Your account will be created
            automatically on first login.
          </p>
        </section>

        {!user && (
          <div className="flex flex-col items-center gap-4">
            {GOOGLE_CLIENT_ID ? (
              <GoogleLoginButton clientId={GOOGLE_CLIENT_ID} onSuccess={handleGoogleCredential} />
            ) : (
              <div className="text-sm text-red-600">Missing Google Client ID</div>
            )}
            <p className="text-xs text-gray-500">We only use your basic profile (name, email, avatar).</p>
          </div>
        )}

        {user && (
          <div className="space-y-6">
            <ProfileCard user={user} />
            <div className="rounded-xl border border-dashed border-indigo-300 p-6 bg-indigo-50/40 text-indigo-700 flex items-start gap-3">
              <Shield className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">You're signed in</p>
                <p className="text-sm opacity-90">Your uploads will be linked to your account.</p>
              </div>
            </div>
          </div>
        )}

        {status && <p className="text-center text-sm text-gray-500">{status}</p>}
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} PixelShare</footer>
    </div>
  );
}
