import Image from 'next/image';
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
    description: <>Hey There! I&apos;m your guide for this journey. Let&apos;s get started!</>,
    background: "roomBg.png",
    character: "wave.png",
    characterAlt: "Smiling character waving",
    answers: [{ text: "Start Adventure", nextStep: 1 }],
  },
  {
    question: "???",
    description: <>Well, I&apos;m not sure what you&apos;re looking for, but I&apos;m here to help you find it.</>,
    background: "roomBg.png",
    character: "confused.png",
    characterAlt: "Character confused",
    answers: [{ text: "Umm, not sure either. Anyway, who are you?", nextStep: 2 }],
  },
  {
    question: "Vovo",
    description: (
      <>
        Well, I forgot about that. I&apos;m <b>Vovo</b>, a Computer Science student at BINUS University, focusing on web and iOS
        development. Currently, I&apos;m a Junior iOS Developer at the Apple Developer Academy. I&apos;ve also worked as a
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
              <Image src="linkedin.png" alt="LinkedIn Logo" width={32} height={32} className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://github.com/gustavohoze"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="GitHub Profile"
            >
              <Image src="github.png" alt="GitHub Logo" width={32} height={32} className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="https://wa.me/6285104937022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="WhatsApp Contact"
            >
              <Image src="phone.png" alt="WhatsApp Logo" width={32} height={32} className="w-8 h-8 pixelated-image" />
            </a>
            <a
              href="mailto:gustaveronic@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label="Email Contact"
            >
              <Image src="mail.png" alt="Email Icon" width={32} height={32} className="w-8 h-8 pixelated-image" />
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

    I&apos;ll just leave you here. If you need anything, just click the done button.

    </>,

    background: "gallery.png",

    character: "wave.png",

    characterAlt: "Character wave",

    answers: [{ text: "Umm Okay, I will have my time here.", nextStep: 'gallery' }],

  },
  {
    question: "Vovo",
    description: (
      <>
        Oh you&apos;re done? <br />Do you want to see something else?
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
    title: 'CariKursus',
    image: 'CariKursus.png',
    description: 'A web that helps students find the best courses for them.',
    link: 'https://github.com/gustavohoze/carikursusfixed',
    category: "web"
  },
  {
    id: 'proj2',
    title: 'BinSight',
    image: 'BinSight.png',
    description: 'A mobile app that helps commuter dispose their trash properly.',
    link: 'https://github.com/MassiveMassimo/Binsight',
    category: "iOS"
  },
  {
    id: 'proj3',
    title: 'GoWay',
    image: 'GoWay.png',
    description: 'A mobile app that helps GOP people navigate the GOP environment.',
    link: 'https://github.com/gustavohoze/GoWayRefined',
    category: 'iOS'
  },
  {
    id: 'proj4',
    title: 'EasyLib',
    image: 'EasyLib.png',
    description: 'A web app that helps the process of borrowing and returning books easier.',
    link: 'https://github.com/gustavohoze/EasyLib',
    category: 'web'
  },

];