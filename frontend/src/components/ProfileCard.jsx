import { Mail, ShieldCheck } from "lucide-react";

export default function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center gap-4">
        <img src={user.picture} alt={user.name || user.email} className="h-14 w-14 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold truncate">{user.name || "Unnamed"}</p>
          <p className="text-sm text-gray-600 flex items-center gap-1 truncate">
            <Mail className="h-4 w-4" /> {user.email}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium">
          <ShieldCheck className="h-4 w-4" /> Verified
        </span>
      </div>
    </div>
  );
}
