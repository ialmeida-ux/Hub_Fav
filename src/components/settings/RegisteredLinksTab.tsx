import { Trash2, ExternalLink, Pencil, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import LinkForm from "./LinkForm";

interface RegisteredLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  iconDark?: string;
  useWhiteFilter?: boolean;
  category: string;
  subcategory?: string;
  subcategoryId?: string;
  description?: string;
}

interface Subcategory {
  id: string;
  name: string;
}

export default function RegisteredLinksTab() {
  const [links, setLinks] = useState<RegisteredLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"favoritos" | "youtube" | "fixados">("favoritos");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const tabs = [
    { key: "favoritos" as const, label: "Favoritos" },
    { key: "youtube" as const, label: "YouTube" },
    { key: "fixados" as const, label: "Fixados" },
  ];

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from("subcategory")
      .select("id, name")
      .eq("category_id", "fixados")
      .order("name");

    if (!error && data) {
      setSubcategories(data);
    }
  };

  const fetchLinks = async () => {
    try {
      // Buscar cards com card_icon
      const { data: cards, error } = await supabase
        .from("cards")
        .select(`
          id,
          title,
          category_id,
          card_icon (
            icon,
            icon_dark,
            link,
            use_white_filter
          )
        `)
        .eq("is_active", true);

      if (error) throw error;

      // Buscar card_clean para fixados
      const { data: cleanCards } = await supabase
        .from("cards")
        .select(`
          id,
          title,
          category_id,
          card_clean (
            url,
            preview,
            description,
            subcategory_id,
            subcategory:subcategory (
              id,
              name
            )
          )
        `)
        .eq("category_id", "fixados")
        .eq("is_active", true);

      const formattedLinks: RegisteredLink[] = [];

      // Processar cards com card_icon
      cards?.forEach((card) => {
        if (card.card_icon?.length > 0) {
          formattedLinks.push({
            id: card.id,
            title: card.title,
            url: card.card_icon[0].link,
            icon: card.card_icon[0].icon,
            iconDark: card.card_icon[0].icon_dark,
            useWhiteFilter: card.card_icon[0].use_white_filter,
            category: card.category_id,
          });
        }
      });

      // Processar cards com card_clean (fixados)
      cleanCards?.forEach((card) => {
        if (card.card_clean?.length > 0) {
          const cleanData = card.card_clean[0];
          // Evitar duplicatas
          if (!formattedLinks.find((l) => l.id === card.id)) {
            formattedLinks.push({
              id: card.id,
              title: card.title,
              url: cleanData.url,
              icon: cleanData.preview,
              category: card.category_id,
              subcategory: cleanData.subcategory?.[0]?.name,
              subcategoryId: cleanData.subcategory_id,
              description: cleanData.description,
            });
          }
        }
      });

      setLinks(formattedLinks);
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    fetchSubcategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este link?")) return;

    try {
      const { error } = await supabase
        .from("cards")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setLinks(links.filter((link) => link.id !== id));

      if ((window as any).refreshFavoriteCards) {
        (window as any).refreshFavoriteCards();
      }
      if ((window as any).refreshPinnedLinks) {
        (window as any).refreshPinnedLinks();
      }

      alert("Link excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir link:", error);
      alert("Erro ao excluir link. Tente novamente.");
    }
  };

  const handleEdit = async (data: { title: string; url: string; preview: string; iconDark?: string; useWhiteFilter?: boolean; description?: string; subcategoryId?: string }) => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from("cards")
        .update({ title: data.title })
        .eq("id", editingId);

      if (error) throw error;

      // Atualizar card_icon se existir
      const { data: existingIcon } = await supabase
        .from("card_icon")
        .select("id")
        .eq("card_id", editingId)
        .single();

      if (existingIcon) {
        const { error: iconError } = await supabase
          .from("card_icon")
          .update({
            link: data.url,
            icon: data.preview,
            icon_dark: data.iconDark || null,
            use_white_filter: data.useWhiteFilter || false,
          })
          .eq("card_id", editingId);

        if (iconError) throw iconError;
      }

      // Atualizar card_clean se existir
      const { data: existingClean } = await supabase
        .from("card_clean")
        .select("id")
        .eq("card_id", editingId)
        .single();

      if (existingClean) {
        const { error: cleanError } = await supabase
          .from("card_clean")
          .update({
            url: data.url,
            preview: data.preview,
            description: data.description || null,
            subcategory_id: data.subcategoryId || null,
          })
          .eq("card_id", editingId);

        if (cleanError) throw cleanError;
      }

      setLinks(links.map((link) =>
        link.id === editingId
          ? { ...link, title: data.title, url: data.url, icon: data.preview, iconDark: data.iconDark, useWhiteFilter: data.useWhiteFilter, description: data.description, subcategoryId: data.subcategoryId }
          : link
      ));

      setEditingId(null);

      if ((window as any).refreshFavoriteCards) {
        (window as any).refreshFavoriteCards();
      }
      if ((window as any).refreshPinnedLinks) {
        (window as any).refreshPinnedLinks();
      }

      alert("Link atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar link:", error);
      alert("Erro ao atualizar link. Tente novamente.");
    }
  };

  const categoryLinks = links.filter((link) => {
    if (link.category !== activeTab) return false;

    // Filtro por busca
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesTitle = link.title.toLowerCase().includes(lowerSearch);
      const matchesSubcategory = link.subcategory?.toLowerCase().includes(lowerSearch);
      if (!matchesTitle && !matchesSubcategory) return false;
    }

    // Filtro por subcategoria (apenas para fixados)
    if (activeTab === "fixados" && selectedSubcategory !== "all") {
      if (link.subcategoryId !== selectedSubcategory) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Links Cadastrados
        </h3>
        <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Links Cadastrados
        </h3>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedSubcategory("all");
                setSearchTerm("");
              }}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                activeTab === tab.key
                  ? "text-blue-500 border-blue-500"
                  : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
              <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                {links.filter((l) => l.category === tab.key).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Button (only for fixados) */}
          {activeTab === "fixados" && subcategories.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedSubcategory !== "all"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">
                  {selectedSubcategory === "all"
                    ? "Todas"
                    : subcategories.find((s) => s.id === selectedSubcategory)?.name || "Filtro"}
                </span>
              </button>

              {/* Filter Menu */}
              {showFilterMenu && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => {
                      setSelectedSubcategory("all");
                      setShowFilterMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg ${
                      selectedSubcategory === "all" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500" : ""
                    }`}
                  >
                    Todas as subcategorias
                  </button>
                  {subcategories.map((sub, index) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id);
                        setShowFilterMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        selectedSubcategory === sub.id ? "bg-blue-50 dark:bg-blue-900/20 text-blue-500" : ""
                      } ${index === subcategories.length - 1 ? "rounded-b-lg" : ""}`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {categoryLinks.map((link) => (
            <div
              key={link.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              {editingId === link.id ? (
                <LinkForm
                  initialData={{
                    id: link.id,
                    title: link.title,
                    url: link.url,
                    icon: link.icon,
                    iconDark: link.iconDark,
                    useWhiteFilter: link.useWhiteFilter,
                    description: link.description,
                    subcategoryId: link.subcategoryId,
                  }}
                  selectedPage={activeTab}
                  onSelectedPageChange={() => {}}
                  onSubmit={handleEdit}
                  onCancel={() => setEditingId(null)}
                  submitLabel="Salvar Alterações"
                  showPageSelector={false}
                  showSubcategorySelector={activeTab === "fixados"}
                  subcategories={subcategories}
                  onSubcategoryChange={() => {}}
                  showDescription={activeTab === "fixados"}
                />
              ) : (
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <img src={link.icon} alt="" className="w-10 h-10 object-contain flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-100 truncate">{link.title}</p>
                    {link.subcategory && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{link.subcategory}</p>
                    )}
                    {link.url && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        <span className="truncate">{link.url}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingId(link.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Editar link"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remover link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {categoryLinks.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic py-8 text-center">
              {searchTerm || selectedSubcategory !== "all"
                ? "Nenhum resultado encontrado."
                : `Nenhum link cadastrado em ${tabs.find((t) => t.key === activeTab)?.label}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
