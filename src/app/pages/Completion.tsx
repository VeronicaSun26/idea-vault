import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { articles } from '../data/articles';
import { Home, BookMarked } from 'lucide-react';
import { ComicPanel, Illustration } from '../components/ComicPanel';
import { PaperTexture, WashiTape, HandDrawnButton } from '../components/HandDrawn';

export default function Completion() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === articleId);
  const [fontFamily] = useState<string>(() => {
    return localStorage.getItem('preferredFont') || 'Kalam';
  });

  useEffect(() => {
    if (!article) {
      navigate('/');
      return;
    }

    // Save completion to localStorage
    const completions = JSON.parse(localStorage.getItem('completions') || '[]');
    const newCompletion = {
      articleId: article.id,
      articleTitle: article.title,
      completedAt: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem('completions', JSON.stringify([...completions, newCompletion]));
  }, [article, navigate]);

  if (!article) return null;

  // Extract key quotes from the article (in real app, this would be more sophisticated)
  const sentences = article.content.split('.').filter(s => s.trim().length > 20);
  const keyQuotes = [
    sentences[0]?.trim() + '.',
    sentences[Math.floor(sentences.length / 2)]?.trim() + '.',
    sentences[sentences.length - 2]?.trim() + '.',
  ].filter(Boolean);

  const handleDownload = () => {
    // In a real app, this would generate a beautiful image
    alert('Image generation feature - would create a beautiful handwritten-style card!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Completed: ${article.title}`,
        text: `I just completed transcribing "${article.title}" - 15 minutes of mindful practice!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] relative overflow-hidden">
      <PaperTexture />

      <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <WashiTape color="#ffd6a5" rotation={-1} className="top-0 left-1/2 -translate-x-1/2 z-0" />
          <h1 className="text-3xl text-[#2d2d2d] mb-2 relative z-10" style={{ fontFamily: `'${fontFamily}', cursive` }}>
            You did it!
          </h1>
          <p className="text-lg text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
            {article.title}
          </p>
          <p className="text-sm text-[#6b6b6b] mt-1">by {article.author}</p>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-16 h-0.5 bg-[#2d2d2d]/20 rounded" style={{ transform: 'rotate(-1deg)' }} />
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="#8b7355" opacity="0.6">
              <circle cx="10" cy="10" r="3" />
            </svg>
            <div className="w-16 h-0.5 bg-[#2d2d2d]/20 rounded" style={{ transform: 'rotate(1deg)' }} />
          </div>
        </motion.div>

        {/* Comic-style panels showing the journey */}
        <div className="space-y-8 mb-12">
          <ComicPanel delay={0.2}>
            <div className="text-center">
              <Illustration type="book" size={100} />
              <h3 className="text-lg text-[#2d2d2d] mt-4 mb-2" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                The Beginning
              </h3>
              <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                You opened this passage with curiosity and intention.
              </p>
            </div>
          </ComicPanel>

          {keyQuotes.length > 0 && (
            <ComicPanel delay={0.4} quote={keyQuotes[0]}>
              <div className="text-center">
                <Illustration type="heart" size={100} />
                <h3 className="text-lg text-[#2d2d2d] mt-4 mb-2" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  The Connection
                </h3>
                <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  Every word you typed brought you closer to the author's thoughts.
                </p>
              </div>
            </ComicPanel>
          )}

          {keyQuotes.length > 1 && (
            <ComicPanel delay={0.6} quote={keyQuotes[1]}>
              <div className="text-center">
                <Illustration type="plant" size={100} />
                <h3 className="text-lg text-[#2d2d2d] mt-4 mb-2" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  The Growth
                </h3>
                <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  With each sentence, your understanding deepened.
                </p>
              </div>
            </ComicPanel>
          )}

          <ComicPanel delay={0.8}>
            <div className="text-center">
              <Illustration type="star" size={100} />
              <h3 className="text-lg text-[#2d2d2d] mt-4 mb-2" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                The Achievement
              </h3>
              <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                You completed this mindful journey. Well done!
              </p>
            </div>
          </ComicPanel>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <HandDrawnButton variant="primary">
              <Home className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                Back Home
              </span>
            </HandDrawnButton>
          </Link>
          <Link to="/collection">
            <HandDrawnButton variant="secondary">
              <BookMarked className="w-4 h-4 mr-2" />
              <span style={{ fontFamily: `'${fontFamily}', cursive` }}>
                View Collection
              </span>
            </HandDrawnButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}