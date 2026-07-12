import { useState, useEffect, useRef, useCallback } from "react";
import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";
import CardClean from "../cards/CardClean";
import type { PinnedLinkCardProps } from "../cards/CardClean";
import { supabase } from "../../lib/supabase";

interface Section {
  key: string;
  title: string;
  subcategoryId: string | null;
  links: PinnedLinkCardProps[];
}

export default function PinnedLinksPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [animatingSections, setAnimatingSections] = useState<Record<string, boolean>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const fetchData = async () => {
    try {
      // Buscar subcategorias
      const { data: subcategories, error: subError } = await supabase
        .from("subcategory")
        .select("id, name, category_id")
        .eq("category_id", "fixados");

      if (subError) throw subError;

      // Buscar cards da categoria fixados
      const { data: cards, error: cardsError } = await supabase
        .from("cards")
        .select(`
          id,
          title,
          card_clean (
            url,
            preview,
            description,
            subcategory_id
          )
        `)
        .eq("category_id", "fixados")
        .eq("is_active", true);

      if (cardsError) throw cardsError;

      // Agrupar por subcategoria
      const sectionsMap = new Map<string, Section>();

      // Criar seção para cards sem subcategoria
      sectionsMap.set("no-subcategory", {
        key: "no-subcategory",
        title: "Outros",
        subcategoryId: null,
        links: [],
      });

      // Criar seções para cada subcategoria
      subcategories?.forEach((sub) => {
        sectionsMap.set(sub.id, {
          key: sub.id,
          title: sub.name,
          subcategoryId: sub.id,
          links: [],
        });
      });

      // Distribuir cards nas seções
      cards?.forEach((card) => {
        const cleanData = card.card_clean?.[0];
        if (cleanData) {
          const subcategoryId = cleanData.subcategory_id;
          const sectionKey = subcategoryId || "no-subcategory";

          if (!sectionsMap.has(sectionKey)) {
            sectionsMap.set(sectionKey, {
              key: sectionKey,
              title: "Outros",
              subcategoryId: null,
              links: [],
            });
          }

          sectionsMap.get(sectionKey)?.links.push({
            id: card.id,
            title: card.title,
            url: cleanData.url,
            preview: cleanData.preview || "",
            description: cleanData.description,
          });
        }
      });

      // Filtrar seções vazias e converter para array
      const filteredSections = Array.from(sectionsMap.values())
        .filter((section) => section.links.length > 0 || section.subcategoryId !== null)
        .sort((a, b) => {
          // Seção "no-subcategory" vai para o final
          if (a.subcategoryId === null) return 1;
          if (b.subcategoryId === null) return -1;
          return 0;
        });

      setSections(filteredSections);

      // Inicializar expandedSections
      const initialExpanded: Record<string, boolean> = {};
      filteredSections.forEach((section) => {
        initialExpanded[section.key] = true;
      });
      setExpandedSections(initialExpanded);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    (window as any).refreshPinnedLinks = fetchData;
    return () => {
      delete (window as any).refreshPinnedLinks;
    };
  }, [fetchData]);

  const toggleSection = useCallback((sectionKey: string) => {
    const isExpanding = !expandedSections[sectionKey];

    if (isExpanding) {
      // Ao expandir: primeiro remover overflow-hidden, depois animar
      setAnimatingSections((prev) => ({ ...prev, [sectionKey]: true }));
      setExpandedSections((prev) => ({ ...prev, [sectionKey]: true }));

      // Após a animação, parar de animar (overflow será removido)
      setTimeout(() => {
        setAnimatingSections((prev) => ({ ...prev, [sectionKey]: false }));
      }, 300);
    } else {
      // Ao colapsar: primeiro animar, depois adicionar overflow-hidden
      setAnimatingSections((prev) => ({ ...prev, [sectionKey]: true }));
      setExpandedSections((prev) => ({ ...prev, [sectionKey]: false }));

      // Após a animação, parar de animar (overflow será adicionado)
      setTimeout(() => {
        setAnimatingSections((prev) => ({ ...prev, [sectionKey]: false }));
      }, 300);
    }
  }, [expandedSections]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
        <BackgroundBlur />
        <Container>
          <div className="mt-25 desktop:mt-0 max-w-6xl mx-auto px-4 py-8">
            <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <BackgroundBlur />
      <Container>
        <div className="mt-25 desktop:mt-0 max-w-6xl mx-auto px-4 py-8">
          {sections.map((section) => {
            const isExpanded = expandedSections[section.key];
            const isAnimating = animatingSections[section.key];

            // Determinar se deve ter overflow-hidden
            // Durante animação: sempre ter
            // Sem animação: só quando colapsado
            const shouldHideOverflow = isAnimating || !isExpanded;

            return (
              <section key={section.key} className="mb-3">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span
                    className={`text-sm inline-flex transition-transform duration-300 ${
                      isExpanded ? "rotate-0" : "-rotate-90"
                    }`}
                  >
                    ▼
                  </span>
                  {section.title}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({section.links.length})
                  </span>
                </button>
                <div
                  ref={(el) => { contentRefs.current[section.key] = el; }}
                  className={`transition-all duration-300 ${
                    shouldHideOverflow ? "overflow-hidden" : ""
                  } ${
                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="my-6 mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.links.map((link) => (
                      <CardClean key={link.id} link={link} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
          {sections.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Nenhum link fixado cadastrado.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
