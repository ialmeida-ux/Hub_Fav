import { X, Plus, Link2, Palette, List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddLinksTab from "../settings/AddLinksTab";
import RegisteredLinksTab from "../settings/RegisteredLinksTab";
import AppearanceTab from "../settings/AppearanceTab";
import AboutTab from "../settings/AboutTab";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsSection = "links" | "registered" | "appearance" | "about";

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SettingsSection>("links");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(false);
      // Trigger animation after component mounts
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAddLink = (page: string, link: { title: string; url: string; preview: string }) => {
    // TODO: Implementar lógica para adicionar link
    console.log("Adicionar link:", { page, ...link });
  };

  const handleDeleteLink = (page: string, linkId: string) => {
    // TODO: Implementar lógica para deletar link
    console.log("Deletar link:", { page, linkId });
  };

  // Mock data - substituir por dados reais do context
  const registeredLinks = {
    favoritos: [
      { id: "1", title: "ChatGPT", url: "https://chat.openai.com" },
      { id: "2", title: "Claude", url: "https://claude.ai" },
    ],
    youtube: [
      { id: "1", title: "Video 1", url: "https://www.youtube.com/watch?v=Nc40WbWz8CE" },
      { id: "2", title: "Video 2", url: "https://www.youtube.com/watch?v=No-qb_uk-_E" },
    ],
    fixados: [
      { id: "1", title: "Exemplo de Site", url: "https://example.com" },
    ],
  };

  const sidebarItems = [
    { id: "links" as SettingsSection, label: "Adicionar Links", icon: Plus },
    { id: "registered" as SettingsSection, label: "Links Cadastrados", icon: List },
    { id: "appearance" as SettingsSection, label: "Aparência", icon: Palette },
    { id: "about" as SettingsSection, label: "Sobre", icon: Link2 },
  ];

  return (
    <div className={`fixed inset-0 z-60 flex items-start justify-center lg:pt-24  ${
      isOpen ? "pointer-events-auto" : "pointer-events-none"
    }`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating && isOpen ? "opacity-100" : "opacity-0"
        } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full lg:min-h-[70vh] min-h-[90vh] max-w-5xl m-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
          isAnimating && isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Content with Sidebar */}
        <div className="flex lg:min-h-[70vh] min-h-[90vh]" >
          {/* Sidebar */}
          <div className="w-64 min-h-full border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === "links" && <AddLinksTab onAddLink={handleAddLink} />}
            {activeSection === "registered" && (
              <RegisteredLinksTab links={registeredLinks} onDeleteLink={handleDeleteLink} />
            )}
            {activeSection === "appearance" && <AppearanceTab />}
            {activeSection === "about" && <AboutTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
