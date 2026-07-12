import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.ts'; 
import type { FavoriteTab } from "../components/common/types.ts"; // Ajuste o caminho

const CACHE_KEY = '@App:favoriteTabs';

export function useFavoriteCards() {
  const [tabs, setTabs] = useState<FavoriteTab[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    try {
      const { data: cards, error } = await supabase
        .from('cards')
        .select(`
          id,
          title,
          card_icon (
            icon,
            icon_dark,
            link,
            use_white_filter
          )
        `)
        .eq('category_id', 'favoritos')
        .eq('is_active', true);

      if (error) throw error;

      const formattedTabs: FavoriteTab[] = cards?.map(card => ({
        icon: card.card_icon?.[0]?.icon || '',
        iconDark: card.card_icon?.[0]?.icon_dark || undefined,
        link: card.card_icon?.[0]?.link || '',
        variant: 'clean' as const,
        useWhiteFilter: card.card_icon?.[0]?.use_white_filter || false
      })) || [];

      // 1. Atualiza o estado da tela
      setTabs(formattedTabs);
      
      // 2. Salva no localStorage para a próxima vez
      localStorage.setItem(CACHE_KEY, JSON.stringify(formattedTabs));

    } catch (error) {
      console.error('Erro ao buscar cards:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Tenta carregar do cache primeiro (Instantâneo)
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      setTabs(JSON.parse(cachedData));
      setLoading(false); // Já libera a tela de loading
    }

    // De qualquer forma, busca dados novos em "segundo plano"
    fetchCards();
  }, [fetchCards]);

  // Retorna apenas o que a interface precisa saber/usar
  return { tabs, loading, fetchCards };
}