import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useState } from 'react';
import { articles, getDailyArticle } from '../data/articles';
import { Book, BookOpen, Clock } from 'lucide-react';
import { 
  HandDrawnCard, 
  HandDrawnButton, 
  HandDrawnDivider, 
  PaperTexture, 
  WashiTape,
  SketchyCircle,
  DoodleArrow 
} from '../components/HandDrawn';

export default function Home() {
  const dailyArticle = getDailyArticle();
  const [fontFamily] = useState<string>(() => {
    return localStorage.getItem('preferredFont') || 'Kalam';
  });

  return (
    <div className="min-h-screen bg-[#F5F3EF] relative">
      <PaperTexture />

      <div className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <WashiTape color="#a8d5e2" rotation={-1} className="top-0 left-1/2 -translate-x-1/2" />
          
          <h1 
            className="text-5xl text-[#2d2d2d] mb-3 tracking-tight"
            style={{ fontFamily: `'${fontFamily}', cursive` }}
          >
            Mindful Transcription
          </h1>
          
          <p 
            className="text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: `'${fontFamily}', cursive` }}
          >
            15 minutes of focused practice. One passage at a time.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-16 h-0.5 bg-[#2d2d2d]/20 rounded" style={{ transform: 'rotate(-1deg)' }} />
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#2d2d2d" opacity="0.4">
              <circle cx="10" cy="10" r="2" />
            </svg>
            <div className="w-16 h-0.5 bg-[#2d2d2d]/20 rounded" style={{ transform: 'rotate(1deg)' }} />
          </div>
        </motion.div>

        {/* Daily Pick Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 
              className="text-2xl text-[#2d2d2d]"
              style={{ fontFamily: `'${fontFamily}', cursive` }}
            >
              Today's Pick
            </h2>
            <DoodleArrow direction="right" className="opacity-40" />
          </div>

          <div className="relative">
            <WashiTape color="#ffd6a5" rotation={2} className="top-4 right-12 z-10" />
            
            <HandDrawnCard className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span 
                      className="text-xs text-[#6b6b6b] uppercase tracking-wider"
                      style={{ fontFamily: `'${fontFamily}', cursive` }}
                    >
                      Daily Featured
                    </span>
                  </div>
                  
                  <h3 
                    className="text-2xl text-[#2d2d2d] mb-2"
                    style={{ fontFamily: `'${fontFamily}', cursive` }}
                  >
                    <SketchyCircle color="#a8d5e2">
                      {dailyArticle.title}
                    </SketchyCircle>
                  </h3>
                  
                  <p 
                    className="text-sm text-[#6b6b6b] mb-4"
                    style={{ fontFamily: `'${fontFamily}', cursive` }}
                  >
                    by {dailyArticle.author}
                  </p>

                  <p 
                    className="text-[#2d2d2d] leading-relaxed mb-6 line-clamp-3"
                    style={{ fontFamily: `'${fontFamily}', cursive` }}
                  >
                    {dailyArticle.content.substring(0, 200)}...
                  </p>

                  <div className="flex items-center gap-6 text-sm text-[#6b6b6b] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                        {dailyArticle.estimatedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                        {dailyArticle.category}
                      </span>
                    </div>
                  </div>

                  <Link to={`/practice/${dailyArticle.id}`}>
                    <HandDrawnButton variant="primary">
                      <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                        Start Today's Practice
                      </span>
                    </HandDrawnButton>
                  </Link>
                </div>
              </div>
            </HandDrawnCard>
          </div>
        </motion.div>

        <HandDrawnDivider className="my-12" />

        {/* All Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-2xl text-[#2d2d2d]"
              style={{ fontFamily: `'${fontFamily}', cursive` }}
            >
              All Passages
            </h2>
            <Link to="/collection">
              <HandDrawnButton variant="ghost">
                <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  View Collection
                </span>
              </HandDrawnButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="relative"
              >
                {index % 4 === 0 && (
                  <WashiTape 
                    color={index % 2 === 0 ? "#ffcfd2" : "#b8e0d2"} 
                    rotation={Math.random() * 4 - 2} 
                    className="-top-2 left-1/4 z-10" 
                  />
                )}
                
                <Link to={`/practice/${article.id}`}>
                  <HandDrawnCard className="h-full p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-[#2d2d2d]/5 rounded-lg">
                        <Book className="w-5 h-5 text-[#2d2d2d]" />
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="text-lg text-[#2d2d2d] mb-1 line-clamp-2"
                          style={{ fontFamily: `'${fontFamily}', cursive` }}
                        >
                          {article.title}
                        </h3>
                        <p 
                          className="text-xs text-[#6b6b6b]"
                          style={{ fontFamily: `'${fontFamily}', cursive` }}
                        >
                          {article.author}
                        </p>
                      </div>
                    </div>

                    <p 
                      className="text-sm text-[#6b6b6b] leading-relaxed line-clamp-3 mb-4"
                      style={{ fontFamily: `'${fontFamily}', cursive` }}
                    >
                      {article.content.substring(0, 120)}...
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#6b6b6b]">
                      <span 
                        className="flex items-center gap-1"
                        style={{ fontFamily: `'${fontFamily}', cursive` }}
                      >
                        <Clock className="w-3 h-3" />
                        {article.estimatedTime}
                      </span>
                      <span 
                        className="px-2 py-1 bg-[#2d2d2d]/5 rounded"
                        style={{ fontFamily: `'${fontFamily}', cursive` }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </HandDrawnCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}