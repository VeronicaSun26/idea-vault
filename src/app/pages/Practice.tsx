import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { articles } from '../data/articles';
import {
  Volume2,
  VolumeX,
  Settings,
  Home,
  Clock,
  CheckCircle2,
  X,
  Music,
  Wind,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { PaperTexture, WashiTape, HandDrawnCard, HandDrawnDivider } from '../components/HandDrawn';

type AudioType = 'music' | 'nature' | 'none';

export default function Practice() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === articleId);

  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [audioType, setAudioType] = useState<AudioType>('none');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [fontFamily, setFontFamily] = useState<string>(() => {
    return localStorage.getItem('preferredFont') || 'Kalam';
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const originalTextRef = useRef<HTMLDivElement>(null);

  const fontOptions = [
    { name: 'Kalam', label: 'Sketchy', description: 'Natural & relaxed' },
    { name: 'Architects Daughter', label: 'Architect', description: 'Clean & structured' },
    { name: 'Patrick Hand', label: 'Friendly', description: 'Warm & approachable' },
    { name: 'Indie Flower', label: 'Playful', description: 'Cute & whimsical' },
    { name: 'Caveat', label: 'Elegant', description: 'Flowing & graceful' },
  ];

  useEffect(() => {
    if (!article) {
      navigate('/');
      return;
    }
    setStartTime(Date.now());
  }, [article, navigate]);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredFont', fontFamily);
  }, [fontFamily]);

  if (!article) return null;

  const normalizedContent = article.content.replace(/\s+/g, ' ').trim();
  const progress = (currentIndex / normalizedContent.length) * 100;

  const handleInputChange = (value: string) => {
    const expectedChar = normalizedContent[currentIndex];
    const inputChar = value[value.length - 1];

    if (value.length > userInput.length) {
      // User is adding a character
      let matches = false;

      if (caseSensitive) {
        matches = inputChar === expectedChar;
      } else {
        matches = inputChar?.toLowerCase() === expectedChar?.toLowerCase();
      }

      if (matches) {
        setUserInput(value);
        setCurrentIndex(currentIndex + 1);

        // Check if completed
        if (currentIndex + 1 === normalizedContent.length) {
          setTimeout(() => {
            navigate(`/completion/${articleId}`);
          }, 500);
        }
      } else {
        // Error: shake effect and don't advance
        if (textareaRef.current) {
          textareaRef.current.classList.add('animate-shake');
          setTimeout(() => {
            textareaRef.current?.classList.remove('animate-shake');
          }, 500);
        }
      }
    } else {
      // User is deleting
      setUserInput(value);
      setCurrentIndex(value.length);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      // Create ambient sound (in real app, load actual audio file)
      audioRef.current = new Audio();
      // Placeholder: in production, you'd load actual ambient sound files
    }

    if (audioType === 'none') {
      setAudioType('music');
      audioRef.current.src = '/sounds/music.mp3';
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    } else if (audioType === 'music') {
      setAudioType('nature');
      audioRef.current.src = '/sounds/nature.mp3';
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    } else {
      setAudioType('none');
      audioRef.current.pause();
    }
  };

  const handleWordLongPress = (word: string) => {
    if (!collectedWords.includes(word)) {
      setCollectedWords([...collectedWords, word]);
      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem('collectedWords') || '[]');
      localStorage.setItem('collectedWords', JSON.stringify([...saved, word]));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render original text with highlighting
  const renderOriginalText = () => {
    const words = normalizedContent.split(' ');
    let charCount = 0;

    return words.map((word, wordIndex) => {
      const wordStart = charCount;
      const wordEnd = charCount + word.length;
      charCount = wordEnd + 1; // +1 for space

      const isCurrentWord = currentIndex >= wordStart && currentIndex < wordEnd;
      const isPastWord = currentIndex > wordEnd;

      return (
        <span key={wordIndex}>
          <motion.span
            className={`inline-block transition-all duration-200 ${
              isCurrentWord
                ? 'bg-[#8b7355]/20 px-0.5 -mx-0.5 rounded'
                : isPastWord
                ? 'opacity-40'
                : ''
            }`}
            animate={
              isCurrentWord
                ? { y: [0, -2, 0] }
                : {}
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            onContextMenu={(e) => {
              e.preventDefault();
              handleWordLongPress(word);
            }}
          >
            {word.split('').map((char, charIndex) => {
              const charPosition = wordStart + charIndex;
              const isCurrentChar = charPosition === currentIndex;

              return (
                <span
                  key={charIndex}
                  className={`${
                    isCurrentChar
                      ? 'relative inline-block after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#8b7355] after:animate-pulse'
                      : ''
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </motion.span>
          {wordIndex < words.length - 1 && ' '}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] relative overflow-hidden">
      <PaperTexture />

      {/* Minimal top bar */}
      <div className="sticky top-0 z-20 bg-[#F5F3EF]/90 backdrop-blur-sm border-b border-[#2d2d2d]/10">
        <div className="container mx-auto px-6 py-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-[#2d2d2d] hover:bg-[#e8e6e0] rounded-lg" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                ← Back
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className="text-[#2d2d2d] hover:bg-[#e8e6e0] rounded-lg"
                title={audioType === 'none' ? 'Enable sound' : audioType === 'music' ? 'Soft music' : 'Nature sounds'}
              >
                {audioType === 'none' ? <VolumeX className="w-4 h-4" /> : audioType === 'music' ? <Music className="w-4 h-4" /> : <Wind className="w-4 h-4" />}
              </Button>

              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-[#2d2d2d] hover:bg-[#e8e6e0] rounded-lg">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#F5F3EF] border-2 border-[#2d2d2d] rounded-lg shadow-lg max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#2d2d2d] text-xl" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                      Settings
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="case-sensitive" className="text-[#2d2d2d]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                        Case Sensitive
                      </Label>
                      <Switch
                        id="case-sensitive"
                        checked={caseSensitive}
                        onCheckedChange={setCaseSensitive}
                      />
                    </div>
                    
                    <div className="border-t border-[#2d2d2d]/10 pt-4">
                      <Label className="text-[#2d2d2d] mb-3 block" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                        Handwriting Style
                      </Label>
                      <div className="grid grid-cols-1 gap-2">
                        {fontOptions.map((option) => (
                          <button
                            key={option.name}
                            onClick={() => setFontFamily(option.name)}
                            className={`text-left px-4 py-2 rounded-lg border border-[#2d2d2d]/20 transition-all ${
                              fontFamily === option.name
                                ? 'bg-[#8b7355]/10 border-[#8b7355]'
                                : 'bg-white hover:bg-[#e8e6e0]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div 
                                  className="text-[#2d2d2d] text-base mb-0.5" 
                                  style={{ fontFamily: `'${option.name}', cursive` }}
                                >
                                  {option.label}
                                </div>
                                <div className="text-xs text-[#6b6b6b]">
                                  {option.description}
                                </div>
                              </div>
                              {fontFamily === option.name && (
                                <CheckCircle2 className="w-5 h-5 text-[#8b7355]" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Article title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center relative"
        >
          <WashiTape color="#b8e0d2" rotation={1} className="top-0 left-1/3 z-0" />
          <h1 className="text-2xl text-[#2d2d2d] mb-1 relative z-10" style={{ fontFamily: `'${fontFamily}', cursive` }}>
            {article.title}
          </h1>
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: `'${fontFamily}', cursive` }}>
            by {article.author}
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="mb-8">
          <ProgressIndicator progress={progress} />
        </div>

        {/* Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <HandDrawnCard className="p-6 min-h-[600px]">
              <div className="mb-4">
                <span className="text-xs text-[#6b6b6b] uppercase tracking-wider" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  Original
                </span>
                <HandDrawnDivider className="mt-2" />
              </div>
              <div
                ref={originalTextRef}
                className="prose max-w-none text-[#2d2d2d] leading-relaxed"
                style={{
                  lineHeight: '1.8',
                  fontSize: '1rem',
                  fontFamily: `'${fontFamily}', cursive`,
                }}
              >
                {renderOriginalText()}
              </div>
            </HandDrawnCard>
          </motion.div>

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <WashiTape color="#ffcfd2" rotation={-2} className="top-4 right-8 z-10" />
            <HandDrawnCard className="p-6 min-h-[600px]">
              <div className="mb-4">
                <span className="text-xs text-[#6b6b6b] uppercase tracking-wider" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  Your transcription
                </span>
                <HandDrawnDivider className="mt-2" />
              </div>
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full h-[500px] bg-transparent border-none outline-none resize-none text-[#2d2d2d] placeholder:text-[#6b6b6b]/50"
                placeholder="Start typing..."
                style={{
                  lineHeight: '1.8',
                  fontSize: '1rem',
                  fontFamily: `'${fontFamily}', cursive`,
                }}
                spellCheck={false}
              />
            </HandDrawnCard>
          </motion.div>
        </div>

        {/* Collected words */}
        <AnimatePresence>
          {collectedWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              <HandDrawnCard className="p-6">
                <h3 className="text-xs text-[#6b6b6b] uppercase tracking-wider mb-4" style={{ fontFamily: `'${fontFamily}', cursive` }}>
                  Collected words
                </h3>
                <div className="flex flex-wrap gap-2">
                  {collectedWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded-full text-sm bg-[#8b7355]/10 text-[#2d2d2d] border border-[#8b7355]/20"
                      style={{ fontFamily: `'${fontFamily}', cursive` }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </HandDrawnCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}