import { useState } from "react";
import Header from "./components/Header.jsx";
import UploadForm from "./components/UploadForm.jsx";
import Gallery from "./components/Gallery.jsx";
import ShareModal from "./components/ShareModal.jsx";

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(null);

  const addItems = (newItems) => {
    setItems((prev) => [...new Set([...newItems, ...prev])]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-2xl shadow-sm border border-black/5 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Upload Photos</h2>
          <UploadForm onAdd={addItems} />
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-black/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Your Gallery</h2>
            <p className="text-sm text-gray-500">{items.length} photo{items.length === 1 ? "" : "s"}</p>
          </div>
          <Gallery items={items} onOpen={setActive} />
        </section>
      </main>

      <ShareModal open={!!active} item={active} onClose={() => setActive(null)} />

      <footer className="py-10 text-center text-sm text-gray-500">
        Built with love • Share beautiful moments instantly
      </footer>
    </div>
  );
}

export default App;
