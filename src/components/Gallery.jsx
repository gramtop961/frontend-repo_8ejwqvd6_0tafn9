import { useMemo, useState } from "react";
import { Share2, ExternalLink } from "lucide-react";

function Gallery({ items, onOpen }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.name.toLowerCase().includes(q));
  }, [items, query]);

  if (!items.length) {
    return (
      <div className="text-center text-gray-500 py-10">No photos yet. Upload to get started.</div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full sm:w-80 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="hidden sm:flex text-xs text-gray-500 items-center gap-2">
          <Share2 size={14} className="text-gray-400" />
          <span>Click to open & share</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpen(item)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm"
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
            <div className="absolute bottom-0 inset-x-0 p-2 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="truncate max-w-[70%]">{item.name}</span>
              <ExternalLink size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
