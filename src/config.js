// Customizable Configuration File
// Edit these values to personalize the website for Hema.

export const CONFIG = {
  // General Info
  girlfriendName: "Hema",
  title: "Our Little Universe",
  
  // Hero Landing Page
  hero: {
    title: "Welcome to Our Little Universe",
    subtitle: "A special place created only for you",
    giftText: "Open Your Surprise",
  },

  // Audio configuration
  music: {
    url: "/bgm.mp3", 
    label: "Background Music"
  },

  // Interactive Love Letter
  loveLetter: {
    recipient: "My Dear Ammu ❤️",
    paragraphs: [
      "First of all... Happy Birthday di ❤️🎂",
      "En life la nee vandha apram neriya vishayangal romba azhaga maariduchu. Un kooda pesura ovvoru moment um, un smile paakura ovvoru second um enaku romba special ❤️",
      "Unoda sirippu, unoda care, unoda chinna chinna habits, unoda way of understanding me... ellame enaku romba pidikkum.",
      "Naan perfect person illa... aana unaku eppavum best ah irukka try panren. Un happiness enaku romba important. Un dreams ellam achieve panna naan un pakkathula irukkanum nu aasai.",
      "Namma share panna memories ellam enaku romba precious. Innum neraya memories create pannanum, neraya sirippu share pannanum, life full ah un kooda travel pannanum nu aasai ❤️",
      "Indha birthday la unaku naan solla virumburadhu onnu dhaan...",
      "Thank you for being a beautiful part of my life. ❤️",
      "Un smile eppavum ipdiye irukkanum.\nUn happiness eppavum adhigama irukkanum.",
      "Once again...\nHappy Birthday My Dear Ammu ❤️✨"
    ],
    closing: "Forever yours ❤️"
  },

  // Memories Gallery (Visual placeholders with custom descriptions)
  // Images can be URLs or relative paths. If empty, beautiful CSS gradient-art is rendered.
  memories: [
    {
      title: "Our First Moment",
      desc: "The day our orbits collided and my world changed forever",
      image: "/Our First Moment.jpeg",
      svgIndex: 0
    },
    {
      title: "Our First Date",
      desc: "A little shyness, a sweet hesitation, and you sitting close to me on our first bike ride together.",
      image: "/Our First Date.jpeg",
      svgIndex: 2
    },
    {
      title: "Your Heartwarming Laugh",
      desc: "The sweet sound that makes all my worries dissolve instantly.",
      image: "/Your Heartwarming Laugh.jpeg",
      svgIndex: 3
    },
    {
      title: "Forever Together",
      desc: "Here's to celebrating you today and holding your hand tomorrow and always.",
      image: "/Forever Together.jpeg",
      svgIndex: 5
    }
  ],

  // Love Timeline
  timeline: [
    {
      date: "The Day We Met",
      title: "Fate Intervened",
      desc: "Our paths crossed, and the stars aligned. The start of something beautiful."
    },
    {
      date: "Our First Chat",
      title: "Late Night Secrets",
      desc: "Talking for hours under the blanket, laughing about everything and nothing."
    },
    {
      date: "The First Date",
      title: "Hearts Racing",
      desc: "A nervous smile, a deep breath, and that magical feeling of knowing this is it."
    },
    {
      date: "Special Milestone",
      title: "Official & In Love",
      desc: "Holding you close and knowing you are the best thing that ever happened to me."
    },
    {
      date: "Today & Forever",
      title: "Happy Birthday!",
      desc: "Another beautiful year around the sun. My heart is completely and utterly yours."
    }
  ],

  // Reasons Why I Love You
  reasons: [
    {
      title: "Your Smile",
      icon: "Smile",
      desc: "It lights up my whole world and makes any difficult day feel instantly better."
    },
    {
      title: "Your Kindness",
      icon: "Flower2",
      desc: "The pure and gentle way you treat everyone and everything around you."
    },
    {
      title: "Your Caring Heart",
      icon: "Heart",
      desc: "How you look out for me, notice the little things, and make me feel completely safe."
    },
    {
      title: "Your Understanding",
      icon: "Compass",
      desc: "The way you read my thoughts, translate my silence, and always know what to say."
    },
    {
      title: "Your Cute Habits",
      icon: "Sparkles",
      desc: "The funny faces you make and the little wrinkle on your nose when you laugh."
    },
    {
      title: "Your Unconditional Support",
      icon: "Handshake",
      desc: "How you stand by me, believe in my dreams, and inspire me to be a better person."
    }
  ],

  // Live Countdown (Set target date)
  countdown: {
    targetDate: "2026-07-02T11:35:00",
    message: "Counting down to the exact moment you blessed this world"
  },

  // Secret surprise section (Password protected)
  secret: {
    password: "LOVE", // Passcode to unlock
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-by-the-sea-42078-large.mp4", // Royalty free placeholder video
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    message: "You are my today, my tomorrow, and my forever. This is a small token of my love for you. Thank you for being my dream come true. Happy Birthday Hema!"
  }
};
