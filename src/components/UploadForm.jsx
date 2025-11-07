import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";

function UploadForm({ onAdd }) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files) => {
    if (!files || !files.length) return;
    setLoading(true);
    const newItems = [];

    for (const file of files) {
      const url = URL.createObjectURL(file);
      newItems.push({ id: `${file.name}-${Date.now()}` , url, name: file.name, file });
    }

    onAdd(newItems);
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all ${dragOver ? "border-indigo-500 bg-indigo-50/50" : "border-gray-300"}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-indigo-600 text-white">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          </div>
          <div>
            <p className="font-medium text-gray-900">Drag and drop photos here</p>
            <p className="text-sm text-gray-500">or</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Choose files
          </button>
          <p className="text-xs text-gray-500">JPEG, PNG, GIF supported</p>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
