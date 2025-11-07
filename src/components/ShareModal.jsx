import { useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

function ShareModal({ open, item, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [item, open]);

  if (!open || !item) return null;

  const shareUrl = item.url; // In a real app this would be a backend-hosted URL

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-[92%] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/5 hover:bg-black/10"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto md:h-full bg-black">
            <img src={item.url} alt={item.name} className="w-full h-full object-contain bg-black" />
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">Share this link with anyone to let them view your photo.</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
              />
              <button
                onClick={copy}
                className={`px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 ${copied ? "bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Tip: Save the image to your device or copy the link to share anywhere.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
