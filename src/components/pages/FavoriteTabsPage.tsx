import { useEffect } from 'react'
import BackgroundBlur from "../layout/BackgroundBlur";
import Container from "../layout/Container";
import CardIcon from "../cards/CardIcon.tsx";
// IMPORTAÇÃO NOVA: O seu hook personalizado
import { useFavoriteCards } from '../../hooks/useFavoriteCards'; 

export default function FavoriteTabsPage() {
  // ALTERAÇÃO PRINCIPAL: Chamamos o arquivo independente em 1 linha
  const { tabs, loading, fetchCards } = useFavoriteCards();

  useEffect(() => {
    (window as any).refreshFavoriteCards = fetchCards
    return () => {
      delete (window as any).refreshFavoriteCards
    }
  }, [fetchCards])

  // Daqui para baixo, o visual contínua EXATAMENTE IGUAL
  if (loading) {
    return (
      <div className="relative min-h-screen mt-25 xl:mt-0 bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
        <BackgroundBlur />
        <Container>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen mt-25 xl:mt-0 bg-gray-100 dark:bg-gray-900 transition-colors duration-700 ">
      <BackgroundBlur />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 desktop:gap-8 mt-25 desktop:mt-0">
          {tabs.map((tab, index) => (
            <CardIcon key={index} tab={tab} />
          ))}
        </div>
      </Container>
    </div>
  );
}