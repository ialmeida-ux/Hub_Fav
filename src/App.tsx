import { BrowserRouter, Routes, Route } from 'react-router'
import FavoriteTabs from './components/pages/FavoriteTabsPage.tsx'
import YouTubePlayerPage from './components/pages/YouTubePlayerPage.tsx'
import PinnedLinksPage from './components/pages/PinnedLinksPage.tsx'
import GamesPage from './components/pages/GamesPage.tsx'
import TerrariaPage from './components/pages/games/TerrariaPage.tsx'
import StardewValleyPage from './components/pages/games/StardewValleyPage.tsx'
import Header from './components/layout/Header.tsx'
import { YouTubePlayerProvider } from './contexts/YouTubePlayerContext.tsx'
import { ThemeProvider } from './components/theme/ThemeProvider.tsx'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <YouTubePlayerProvider>
          <Header />
          <Routes>
            <Route path="/" element={<FavoriteTabs />} />
            <Route path="/youtube" element={<YouTubePlayerPage />} />
            <Route path="/fixados" element={<PinnedLinksPage />} />
            <Route path="/jogos" element={<GamesPage />} />
            <Route path="/jogos/terraria" element={<TerrariaPage />} />
            <Route path="/jogos/stardew-valley" element={<StardewValleyPage />} />
          </Routes>
        </YouTubePlayerProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
