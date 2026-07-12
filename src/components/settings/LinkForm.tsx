import { Youtube, Bookmark } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface LinkFormData {
  title: string;
  url: string;
  preview: string;
  iconDark?: string;
  useWhiteFilter?: boolean;
  description?: string;
  subcategoryId?: string;
}

interface Subcategory {
  id: string;
  name: string;
}

interface LinkFormProps {
  initialData?: {
    id?: string;
    title: string;
    url: string;
    icon?: string;
    iconDark?: string;
    useWhiteFilter?: boolean;
    description?: string;
    subcategoryId?: string;
  };
  selectedPage: "favoritos" | "youtube" | "fixados";
  onSelectedPageChange: (page: "favoritos" | "youtube" | "fixados") => void;
  onSubmit: (data: LinkFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  showPageSelector?: boolean;
  showSubcategorySelector?: boolean;
  subcategories?: Subcategory[];
  onSubcategoryChange?: (value: string) => void;
  showNewSubcategory?: boolean;
  newSubcategoryName?: string;
  onNewSubcategoryNameChange?: (value: string) => void;
  showDescription?: boolean;
}

export default function LinkForm({
  initialData,
  selectedPage,
  onSelectedPageChange,
  onSubmit,
  onCancel,
  submitLabel = "Adicionar Link",
  showPageSelector = true,
  showSubcategorySelector = false,
  subcategories = [],
  onSubcategoryChange,
  showNewSubcategory = false,
  newSubcategoryName = "",
  onNewSubcategoryNameChange,
  showDescription = false,
}: LinkFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [preview, setPreview] = useState(initialData?.icon || "");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconDarkFile, setIconDarkFile] = useState<File | null>(null);
  const [useWhiteFilter, setUseWhiteFilter] = useState(initialData?.useWhiteFilter || false);
  const [description, setDescription] = useState(initialData?.description || "");
  const [localSubcategoryId, setLocalSubcategoryId] = useState(initialData?.subcategoryId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIconUpload = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("card-icons")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("card-icons")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) {
      alert("Preencha pelo menos o título e a URL");
      return;
    }

    setIsSubmitting(true);
    try {
      let iconUrl = preview;
      let iconDarkUrl = initialData?.iconDark || "";

      if (iconFile) {
        iconUrl = await handleIconUpload(iconFile);
      }

      if (iconDarkFile) {
        iconDarkUrl = await handleIconUpload(iconDarkFile);
      }

      await onSubmit({
        title,
        url,
        preview: iconUrl,
        iconDark: iconDarkUrl || undefined,
        useWhiteFilter,
        description: description || undefined,
        subcategoryId: localSubcategoryId || undefined,
      });
    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {showPageSelector && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Página de Destino
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onSelectedPageChange("favoritos")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPage === "favoritos"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Favoritos
            </button>
            <button
              onClick={() => onSelectedPageChange("youtube")}
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
              onClick={() => onSelectedPageChange("fixados")}
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
      )}

      {showSubcategorySelector && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Subcategoria
          </label>
          <select
            value={showNewSubcategory ? "new" : localSubcategoryId}
            onChange={(e) => {
              if (e.target.value === "new") {
                onSubcategoryChange?.("new");
              } else {
                setLocalSubcategoryId(e.target.value);
                onSubcategoryChange?.(e.target.value);
              }
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="">Selecione uma subcategoria</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
            <option value="new">+ Adicionar uma nova</option>
          </select>
        </div>
      )}

      {showSubcategorySelector && showNewSubcategory && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Nova Subcategoria
          </label>
          <input
            type="text"
            value={newSubcategoryName}
            onChange={(e) => onNewSubcategoryNameChange?.(e.target.value)}
            placeholder="Nome da nova subcategoria"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      {showDescription && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Descrição (Opcional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do link"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
      )}

      {selectedPage === "fixados" && (
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Imagem Preview (URL)
          </label>
          <input
            type="url"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
      )}

      {selectedPage === "favoritos" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Ícone (Imagem)
            </label>
            {initialData?.icon && !iconFile && (
              <div className="mb-2 flex items-center gap-4">
                {initialData?.iconDark && (
                  <>
                    <div className="flex items-center gap-2">
                      <img src={initialData.icon} alt="Ícone claro" className="w-10 h-10 object-contain" />
                      <span className="text-xs text-gray-500">Claro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={initialData.iconDark} alt="Ícone escuro" className="w-10 h-10 object-contain" />
                      <span className="text-xs text-gray-500">Escuro</span>
                    </div>
                  </>
                )}
                {!initialData?.iconDark && initialData?.useWhiteFilter && (
                  <div className="flex items-center gap-2">
                    <img src={initialData.icon} alt="Ícone com filtro" className="w-10 h-10 object-contain dark:invert dark:brightness-0 dark:contrast-200" />
                    <span className="text-xs text-gray-500">Modo dark com filtro</span>
                  </div>
                )}
                {!initialData?.iconDark && !initialData?.useWhiteFilter && (
                  <div className="flex items-center gap-2">
                    <img src={initialData.icon} alt="Ícone atual" className="w-10 h-10 object-contain" />
                    <span className="text-xs text-gray-500">Apenas um ícone</span>
                  </div>
                )}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIconFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Ícone Dark (Opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setIconDarkFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filtro branco no modo escuro?
            </label>
            <button
              type="button"
              onClick={() => setUseWhiteFilter(!useWhiteFilter)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                useWhiteFilter ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  useWhiteFilter ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          {isSubmitting ? "Processando..." : submitLabel}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
