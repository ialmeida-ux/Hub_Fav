import { Youtube, Bookmark } from "lucide-react";
import { useState } from "react";

interface AddLinksTabProps {
  onAddLink: (page: string, link: { title: string; url: string; preview: string }) => void;
}

export default function AddLinksTab({ onAddLink }: AddLinksTabProps) {
  const [selectedPage, setSelectedPage] = useState<"favoritos" | "youtube" | "fixados">("favoritos");
  const [newLink, setNewLink] = useState({ title: "", url: "", preview: "" });

  const handleAddLink = () => {
    onAddLink(selectedPage, newLink);
    setNewLink({ title: "", url: "", preview: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Adicionar Novo Link
        </h3>
        
        {/* Page Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Página de Destino
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPage("favoritos")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPage === "favoritos"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Favoritos
            </button>
            <button
              onClick={() => setSelectedPage("youtube")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPage === "youtube"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Youtube className="w-4 h-4 inline mr-2" />
              YouTube
            </button>
            <button
              onClick={() => setSelectedPage("fixados")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPage === "fixados"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Bookmark className="w-4 h-4 inline mr-2" />
              Fixados
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Título
            </label>
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
              placeholder="Nome do link"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              URL
            </label>
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://exemplo.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {selectedPage === "fixados" && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Imagem Preview (URL)
              </label>
              <input
                type="url"
                value={newLink.preview}
                onChange={(e) => setNewLink({ ...newLink, preview: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          )}

          <button
            onClick={handleAddLink}
            className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Adicionar Link
          </button>
        </div>
      </div>
    </div>
  );
}
