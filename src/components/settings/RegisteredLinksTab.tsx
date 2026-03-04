import { Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";

interface RegisteredLink {
  id: string;
  title: string;
  url: string;
}

interface RegisteredLinksTabProps {
  links: {
    favoritos: RegisteredLink[];
    youtube: RegisteredLink[];
    fixados: RegisteredLink[];
  };
  onDeleteLink: (page: string, linkId: string) => void;
}

export default function RegisteredLinksTab({ links, onDeleteLink }: RegisteredLinksTabProps) {
  const tabs = [
    { key: 'favoritos' as keyof typeof links, label: 'Favoritos', },
    { key: 'youtube' as keyof typeof links, label: 'YouTube' },
    { key: 'fixados' as keyof typeof links, label: 'Fixados'},
  ];

  const [activeTab, setActiveTab] = useState<keyof typeof links>('favoritos');
  const activeTabData = tabs.find(tab => tab.key === activeTab);
  const categoryLinks = links[activeTab];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Links Cadastrados
        </h3>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200"
                }`}
              >
               
                {tab.label}
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {links[tab.key].length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-2">
          {categoryLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-100">{link.title}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                >
                  {link.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <button
                onClick={() => onDeleteLink(activeTab, link.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Remover link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {categoryLinks.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic py-8 text-center">
              Nenhum link cadastrado em {activeTabData?.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
