import { createContext, useContext, useState, type ReactNode } from 'react';

interface YouTubePlayerContextType {
  currentVideoId: string;
  setCurrentVideoId: (id: string) => void;
}

const YouTubePlayerContext = createContext<YouTubePlayerContextType | undefined>(undefined);

export function YouTubePlayerProvider({ children }: { children: ReactNode }) {
  const [currentVideoId, setCurrentVideoId] = useState('Nc40WbWz8CE');

  return (
    <YouTubePlayerContext.Provider value={{ currentVideoId, setCurrentVideoId }}>
      {children}
    </YouTubePlayerContext.Provider>
  );
}

export function useYouTubePlayer() {
  const context = useContext(YouTubePlayerContext);
  if (!context) {
    throw new Error('useYouTubePlayer must be used within YouTubePlayerProvider');
  }
  return context;
}
