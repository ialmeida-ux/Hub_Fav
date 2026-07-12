import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import LinkForm from "./LinkForm";

interface Subcategory {
  id: string;
  name: string;
}

export default function AddLinksTab() {
  const [selectedPage, setSelectedPage] = useState<"favoritos" | "youtube" | "fixados">("favoritos");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [showNewSubcategory, setShowNewSubcategory] = useState(false);

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

  useEffect(() => {
    if (selectedPage === "fixados") {
      fetchSubcategories();
    }
  }, [selectedPage]);

  const handleSubcategoryChange = (value: string) => {
    if (value === "new") {
      setShowNewSubcategory(true);
      setSelectedSubcategory("");
    } else {
      setShowNewSubcategory(false);
      setSelectedSubcategory(value);
    }
  };

  const createSubcategory = async (name: string): Promise<string | null> => {
    const { data, error } = await supabase
      .from("subcategory")
      .insert({
        category_id: "fixados",
        name: name,
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  };

  const handleSubmit = async (data: { title: string; url: string; preview: string; description?: string }) => {
    try {
      if (selectedPage === "fixados") {
        let subcategoryId = selectedSubcategory;

        // Criar nova subcategoria se necessário
        if (showNewSubcategory && newSubcategoryName.trim()) {
          subcategoryId = await createSubcategory(newSubcategoryName.trim()) || "";
          setNewSubcategoryName("");
          setShowNewSubcategory(false);
          await fetchSubcategories();
        }

        const { data: card, error: cardError } = await supabase
          .from("cards")
          .insert({
            title: data.title,
            category_id: "fixados",
            is_active: true,
          })
          .select()
          .single();

        if (cardError) throw cardError;

        const { error: cleanError } = await supabase
          .from("card_clean")
          .insert({
            card_id: card.id,
            subcategory_id: subcategoryId || null,
            url: data.url,
            preview: data.preview || null,
            description: data.description || null,
          });

        if (cleanError) throw cleanError;

        if ((window as any).refreshPinnedLinks) {
          (window as any).refreshPinnedLinks();
        }

        alert("Link adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
      alert("Erro ao adicionar link. Tente novamente.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Adicionar Novo Link
        </h3>
        <LinkForm
          selectedPage={selectedPage}
          onSelectedPageChange={setSelectedPage}
          onSubmit={handleSubmit}
          submitLabel="Adicionar Link"
          showPageSelector={true}
          showSubcategorySelector={selectedPage === "fixados"}
          subcategories={subcategories}
          onSubcategoryChange={handleSubcategoryChange}
          showNewSubcategory={showNewSubcategory}
          newSubcategoryName={newSubcategoryName}
          onNewSubcategoryNameChange={setNewSubcategoryName}
          showDescription={selectedPage === "fixados"}
        />
      </div>
    </div>
  );
}
