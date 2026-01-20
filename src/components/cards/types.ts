export interface FavoriteTab {
  icon: string;
  iconDark?: string;
  title?: string;
  description?: string;
  link: string;
  variant?: 'clean' | 'default'; // 'clean' = logo grande sem texto, 'default' = logo pequena com texto
}