import { useState } from "react";

const videos = [
  { id: "Nc40WbWz8CE", title: "50/10 Pomodoro Timer with Pink Noise" },
  { id: "No-qb_uk-_E", title: "Video 2" },
  { id: "0w80F8FffQ4", title: "Video 3" },
  { id: "kjyIClRhSl4", title: "Video 3" },
  { id: "q1T8tGb_A1M", title: "Video 3" },
];

export default function YouTubePlayerPage() {
  const [currentVideoId, setCurrentVideoId] = useState(videos[0].id);

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:pt-[100px]">
        {/* Main Player */}
        <div className="mb-8">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Video Selection Grid */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Escolha um vídeo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
             <div
                key={video.id}
                onClick={() => setCurrentVideoId(video.id)}
                className={`cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                  currentVideoId === video.id ? "ring-4 ring-blue-500" : ""
                }`}
              >
                {/* Container com aspect ratio fixo */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>             
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}