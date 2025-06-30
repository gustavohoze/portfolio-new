// visitorModelData.js
interface VisitorData {
  question: string;
  description: React.ReactNode;
  background: string;
  character: string;
  characterAlt: string;
  answers: { text: string; nextStep: number | 'gallery' | 'contact' | 'award'; }[];
  contentBox?: React.ReactNode; // Mark as optional
}

export const visitorModelData: VisitorData[] = [
  {
    question: "???",
    description: <>Hey There! I'm your guide for this journey. Let's get started!</>,
    background: "roomBg.png",
    character: "wave.png",
    characterAlt: "Smiling character waving",
    answers: [{ text: "Start Adventure", nextStep: 1 }],
  },
  {
    question: "???",
    description: <>Well, I'm not sure what you're looking for, but I'm here to help you find it.</>,
    background: "roomBg.png",
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [{ text: "Umm, I'm not sure either. Anyway, who are you?", nextStep: 2 }],
  },
  {
    question: "Vovo",
    description: (
      <>
        Well, I forgot about that. I’m <b>Vovo</b>, a Computer Science student at BINUS University, focusing on web and iOS
        development. Currently, I’m a Junior iOS Developer at the Apple Developer Academy. I’ve also worked as a
        Front-End Developer and mentor at BNCC.
      </>
    ),
    background: "roomBg.png",
    character: "careless.png",
    characterAlt: "Character careless",
    answers: [{ text: "Oh, Nice to meet you! So, what can I do here?", nextStep: 3 }],
    contentBox: (
      <div>
        <h3 className="pixel-text text-lg mb-2 text-white text-bold">New Notification!</h3>
        <a
          href="https://docs.google.com/document/d/12TEgHTNlh4rFxdjlUMzFQn4gq9WWhF3XQhGhrNtygNE/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-gray-200 pixel-text"
        >
          View or Download CV
        </a>
        <div className="mt-4">
          <div className="flex flex-row gap-4 items-center flex-wrap">
            <a
              href="https://linkedin.com/in/gustavohoze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="LinkedIn Profile"
            >
              <img src="linkedin.png" alt="LinkedIn Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://github.com/gustavohoze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="GitHub Profile"
            >
              <img src="github.png" alt="GitHub Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://wa.me/6285104937022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="WhatsApp Contact"
            >
              <img src="phone.png" alt="WhatsApp Logo" className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="mailto:gustaveronic@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="Email Contact"
            >
              <img src="mail.png" alt="Email Icon" className="w-8 h-8 pixelated-image" />
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Vovo",
    description: <>Well, what are you looking for?</>,
    background: "roomBg.png",
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [
      { text: "I want to see your projects", nextStep: 4 }, // Changed nextStep to 'gallery'
      { text: "I want to ask you something", nextStep: 'contact' },
      { text: "Do you have any awards?", nextStep: 'award' },
    ],
  },
  {
    question: "Vovo",

    description: <>

    Tadaa! Here are some of my projects! <br />

    I'll just leave you here. If you need anything, just click the done button.

    </>,

    background: "gallery.png",

    character: "wave.png",

    characterAlt: "Character wave",

    answers: [{ text: "Umm Okay, I'll have my time here.", nextStep: 'gallery' }],

  },
  {
    question: "Vovo",
    description: (
      <>
        Oh you're done? <br />Do you want to see something else?
      </>
    ),
    background: "gallery.png", // This background will be shown when returning from gallery
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [
      { text: "I want to see your projects", nextStep: 'gallery' },
      { text: "I want to ask you something", nextStep: 'contact' },
      { text: "Do you have any awards?", nextStep: 'award' },
    ],
  },
];

// Project data (move this to a separate file, e.g., projectData.js)
export const projectData = [
  {
    id: 'proj1',
    title: 'Pixel Art Platformer',
    image: 'project_platformer.png',
    description: 'A retro-style 2D platformer game with pixel art graphics and challenging levels.',
    link: 'https://example.com/platformer',
    category: 'games'
  },
  {
    id: 'proj2',
    title: '8-bit Music Visualizer',
    image: 'project_music_viz.png',
    description: 'An interactive web application that visualizes music with mesmerizing pixel art animations.',
    link: 'https://example.com/music-viz',
    category: 'web'
  },
  {
    id: 'proj3',
    title: 'Retro Arcade Cabinet',
    image: 'project_arcade.png',
    description: 'A simulated arcade cabinet experience with classic pixel games, built with love.',
    link: 'https://example.com/arcade',
    category: 'games'
  },
  {
    id: 'proj4',
    title: 'Tile-based RPG',
    image: 'project_rpg.png',
    description: 'A top-down pixel art RPG with turn-based combat and an engaging storyline.',
    link: 'https://example.com/rpg',
    category: 'games'
  },
  {
    id: 'proj5',
    title: 'Pixel Art Portfolio Website',
    image: 'project_portfolio.png',
    description: 'This very website, designed and built with a strong pixel art aesthetic from scratch.',
    link: 'https://example.com/this-site',
    category: 'web'
  },
  {
    id: 'proj6',
    title: 'CLI Adventure Game',
    image: 'project_cli.png',
    description: 'A text-based adventure game playable directly from the command line, full of retro charm.',
    link: 'https://example.com/cli-game',
    category: 'games'
  },
];