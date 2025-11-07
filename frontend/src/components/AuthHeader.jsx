import { Camera, LogIn, LogOut, User } from "lucide-react";

export default function AuthHeader({ user, onLoginClick, onLogout }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold text-lg">PixelShare</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img src={user.picture} alt={user.name || user.email} className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight">{user.name || user.email}</p>
                <p className="text-xs text-gray-500 -mt-0.5">Signed in</p>
              </div>
              <button onClick={onLogout} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          ) : (
            <button onClick={onLoginClick} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
              <LogIn className="h-4 w-4" /> Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
