export interface FavoriteTab {
  icon: string;
  iconDark?: string;
  link: string;
  title?: string;
  description?: string;
  variant?: 'clean' | 'default'; // 'clean' = logo grande sem texto, 'default' = logo pequena com texto
  useWhiteFilter?: boolean; // Aplicar filtro branco no modo escuro quando não houver imagem dark
}