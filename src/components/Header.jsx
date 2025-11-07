import { Camera, Share2 } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <Camera size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 leading-tight">SnapShare Portfolio</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Upload your photos. Share with anyone.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <Share2 size={16} className="text-gray-400" />
          <span>Click a photo to view and share</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
