import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { BookMarked, Home, Sparkles, Calendar, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  DecorativeFlower,
  DecorativeStar,
  DecorativeBook,
  DecorativeNotebook,
  KawaiiCat,
  DecorativeHeart,
} from '../components/decorative/Illustrations';

interface Completion {
  articleId: string;
  articleTitle: string;
  completedAt: string;
  date: string;
}

export default function Collection() {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [collectedWords, setCollectedWords] = useState<string[]>([]);

  useEffect(() => {
    // Load completions from localStorage
    const saved = JSON.parse(localStorage.getItem('completions') || '[]');
    setCompletions(saved);

    // Load collected words
    const words = JSON.parse(localStorage.getItem('collectedWords') || '[]');
    setCollectedWords(words);
  }, []);

  const handleDeleteCompletion = (index: number) => {
    const updated = completions.filter((_, i) => i !== index);
    setCompletions(updated);
    localStorage.setItem('completions', JSON.stringify(updated));
  };

  const handleDeleteWord = (word: string) => {
    const updated = collectedWords.filter((w) => w !== word);
    setCollectedWords(updated);
    localStorage.setItem('collectedWords', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-cyan-100 relative overflow-hidden">
      {/* Comic-style grid pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px),
                         repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Decorative illustrations in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 text-yellow-500"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <DecorativeFlower />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 w-28 h-28 text-cyan-500"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <DecorativeStar />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-16 w-36 h-36 text-green-400"
          animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <KawaiiCat />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-32 h-28 text-yellow-400"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <DecorativeBook />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-12 w-28 h-32 text-lime-500"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <DecorativeNotebook />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookMarked className="w-10 h-10 text-green-600 stroke-[2.5]" />
                <h1 className="text-5xl font-black text-gray-900 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                  MY COLLECTION
                </h1>
                <motion.div
                  className="w-12 h-12 text-yellow-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <DecorativeHeart />
                </motion.div>
              </div>
              <p className="text-xl text-gray-700 font-bold">
                Your journey of words and mindful practice
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-4 border-gray-900 text-gray-900 font-black bg-cyan-200 hover:bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all py-6 px-8">
                <Home className="w-5 h-5 mr-2 stroke-[2.5]" />
                HOME
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Completions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
            <Sparkles className="w-8 h-8 text-yellow-500 stroke-[2.5]" />
            COMPLETED PASSAGES
            <motion.div
              className="w-10 h-10 text-yellow-500 ml-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <DecorativeFlower />
            </motion.div>
          </h2>

          {completions.length === 0 ? (
            <Card className="border-4 border-dashed border-gray-900 bg-white relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-4 right-4 w-20 h-20 text-yellow-300 opacity-30">
                <DecorativeFlower />
              </div>
              <CardContent className="py-16 text-center">
                <div className="w-28 h-28 mx-auto mb-6 text-yellow-400">
                  <DecorativeNotebook />
                </div>
                <p className="text-gray-900 font-black text-xl mb-2">No completions yet</p>
                <p className="text-base text-gray-700 font-bold mb-6">
                  Start your first transcription to build your collection
                </p>
                <Link to="/">
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-black text-lg py-6 px-8 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                    BEGIN PRACTICE
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completions.map((completion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-4 border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] relative group overflow-hidden">
                    {/* Small decorative illustration in corner */}
                    <div className="absolute top-2 right-2 w-14 h-14 opacity-25" style={{
                      color: index % 3 === 0 ? '#fbbf24' : index % 3 === 1 ? '#10b981' : '#06b6d4'
                    }}>
                      {index % 3 === 0 && <DecorativeFlower />}
                      {index % 3 === 1 && <DecorativeStar />}
                      {index % 3 === 2 && <DecorativeHeart />}
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-2xl text-gray-900 font-black mb-1">
                            {completion.articleTitle}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-gray-700 font-bold">
                            <Calendar className="w-4 h-4 stroke-[2.5]" />
                            {completion.date}
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCompletion(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 border-2 border-gray-900 hover:bg-red-100 font-black"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5]" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="w-24 h-24 border-4 border-green-500 rounded-full flex items-center justify-center opacity-30 ml-auto -rotate-12 bg-green-100">
                        <div className="text-center">
                          <Sparkles className="w-7 h-7 mx-auto text-green-600 stroke-[2.5]" />
                          <div className="text-[9px] font-black text-green-600 uppercase mt-1">
                            Done
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Collected Words Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
            <BookMarked className="w-8 h-8 text-cyan-500 stroke-[2.5]" />
            COLLECTED WORDS
            <motion.div
              className="w-10 h-10 text-cyan-500 ml-2"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <DecorativeStar />
            </motion.div>
          </h2>

          {collectedWords.length === 0 ? (
            <Card className="border-4 border-dashed border-gray-900 bg-white relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute bottom-4 left-4 w-20 h-20 text-cyan-300 opacity-30">
                <DecorativeStar />
              </div>
              <CardContent className="py-16 text-center">
                <p className="text-gray-900 font-black text-xl mb-2">No words collected yet</p>
                <p className="text-base text-gray-700 font-bold">
                  Long-press words during practice to add them to your collection
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-4 border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute top-6 right-6 w-20 h-20 text-yellow-300 opacity-15">
                <DecorativeFlower />
              </div>
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-wrap gap-3">
                  {collectedWords.map((word, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative"
                    >
                      <span
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black border-3 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        style={{
                          backgroundColor: index % 3 === 0 ? '#fef3c7' : index % 3 === 1 ? '#d1fae5' : '#cffafe',
                          color: '#1f2937'
                        }}
                      >
                        {word}
                        <button
                          onClick={() => handleDeleteWord(word)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 ml-1"
                        >
                          <Trash2 className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Stats Summary */}
        {completions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="border-4 border-gray-900 bg-gradient-to-br from-yellow-100 to-cyan-100 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-0 right-0 w-36 h-36 text-green-300 opacity-20">
                <KawaiiCat />
              </div>
              <CardContent className="pt-8 pb-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {completions.length}
                    </div>
                    <div className="text-sm text-gray-700 font-bold">Passages Completed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {collectedWords.length}
                    </div>
                    <div className="text-sm text-gray-700 font-bold">Words Collected</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {completions.length * 15}
                    </div>
                    <div className="text-sm text-gray-700 font-bold">Minutes Practiced</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}