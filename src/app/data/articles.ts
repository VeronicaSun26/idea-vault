export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  estimatedMinutes: number;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Beauty of Small Things',
    author: 'Anonymous',
    difficulty: 'easy',
    tags: ['mindfulness', 'nature'],
    estimatedMinutes: 5,
    content: `There is a quiet magic in the small things we often overlook. The way morning light filters through leaves, casting dancing shadows on the ground. The warmth of a cup of tea held between cold hands. The soft rustle of pages turning in a beloved book.

These moments ask nothing of us but our attention. They whisper rather than shout, inviting us to pause and simply be present. In our rush to accomplish great things, we forget that life is made of these tiny, tender moments.

Today, try to notice one small beautiful thing. Let it remind you that wonder is always within reach, waiting patiently for us to look closer.`
  },
  {
    id: '2',
    title: 'The Art of Beginning Again',
    author: 'Maya Chen',
    difficulty: 'medium',
    tags: ['growth', 'resilience'],
    estimatedMinutes: 8,
    content: `Every ending carries within it the seed of a new beginning. When one door closes, we often stand in the hallway, mourning what was, forgetting that other doors are waiting to be opened.

Beginning again requires courage—the courage to release what no longer serves us, to forgive ourselves for paths not taken, and to step forward into uncertainty with open hands and an open heart. It means acknowledging that who we were yesterday was necessary, but who we might become tomorrow is equally important.

The Japanese art of kintsugi teaches us that broken things, when mended with care, become more beautiful for having been broken. Our own new beginnings work the same way. Each restart is an opportunity to incorporate all we've learned, all we've survived, into something stronger and more authentic than before.

So if you find yourself at a starting line again, know this: you are not back where you began. You are beginning from a place of wisdom, carrying forward only what matters, leaving behind what weighs you down.`
  },
  {
    id: '3',
    title: 'Letters to Your Future Self',
    author: 'James Morrison',
    difficulty: 'medium',
    tags: ['reflection', 'hope'],
    estimatedMinutes: 10,
    content: `Dear Future Me,

I hope you remember this moment—the uncertainty, the hope, the quiet determination that pulses beneath your skin. I hope you can look back and smile at how worried you were about things that eventually worked themselves out.

Right now, I'm writing to you from a place of not knowing. I don't know if the risks I'm taking will pay off, if the people I love will stay, if I'll become the person I hope to be. But I'm writing anyway, because I believe in you—in the person I'm becoming.

I hope you've learned to be gentler with yourself. I hope you've discovered that perfection is a cage and that messy, authentic living is where real joy lives. I hope you've kept the promises that matter and forgiven yourself for the ones you couldn't keep.

Remember: every version of you that came before led to the person reading this now. Honor that journey. You've always been enough.

With hope and curiosity,
Your Past Self`
  },
  {
    id: '4',
    title: 'The Sound of Rain',
    author: 'Elena Rodriguez',
    difficulty: 'easy',
    tags: ['nature', 'peace'],
    estimatedMinutes: 4,
    content: `Rain has its own language, speaking in rhythms only the patient can hear. Each drop is a word, each storm a story, each drizzle a gentle conversation with the earth.

When rain falls, the world softens. Colors deepen, sounds muffle, and time seems to slow its relentless march. We're invited indoors, given permission to be still, to watch water trace paths down windowpanes like thoughts wandering through a quiet mind.

There's comfort in rain's predictability and surprise in its timing. It nourishes without asking for gratitude, gives without expectation of return. Perhaps that's why it soothes us—it reminds us that some things simply are, existing beyond our need to understand or control them.

Listen closely next time it rains. You might hear what you've been too busy to notice: the world breathing, the earth drinking, and the gentle reminder that renewal is always falling from the sky.`
  },
  {
    id: '5',
    title: 'The Space Between Words',
    author: 'Thomas Greene',
    difficulty: 'hard',
    tags: ['communication', 'philosophy'],
    estimatedMinutes: 12,
    content: `Language is our most sophisticated tool for connection, yet what we don't say often speaks louder than what we do. The pause before answering a difficult question. The breath held between confession and response. The silence that follows "I love you" or "I'm sorry."

These spaces between words are not empty—they're pregnant with meaning, dense with emotion, heavy with everything language cannot quite capture. We spend so much time choosing the right words, but perhaps we should pay equal attention to the spaces we leave around them, the silences we allow to breathe between our carefully constructed sentences.

In music, rests are as important as notes. They give shape to melody, provide contrast, allow the previous note to resonate before the next one sounds. Our conversations work the same way. The most profound communications often happen in the spaces where words fail, where we must rely on presence, on the weight of a look, the quality of attention, the courage to simply sit with someone in their joy or their pain without rushing to fill the quiet.

The next time you find yourself reaching for words to fill an uncomfortable silence, consider this: perhaps that silence is exactly what's needed. Perhaps in the space between words, understanding grows in ways that language alone could never achieve.`
  }
];

export const getDailyArticle = (): Article => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return articles[dayOfYear % articles.length];
};
