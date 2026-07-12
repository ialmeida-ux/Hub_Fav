import { createClient } from '@supabase/supabase-js';

// Busca as chaves do arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação de segurança para evitar erros silenciosos caso o .env não seja carregado
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltam as credenciais do Supabase. Verifique se o arquivo .env está configurado corretamente.'
  );
}

// Cria e exporta a instância do cliente para ser usada em qualquer lugar do app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);