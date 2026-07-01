# Our Little Universe ❤️

A premium, interactive, mobile-first romantic birthday surprise website built for **Hema**.

Designed with rich aesthetics, glassmorphism, responsive elements, and smooth animations using **React, Vite, Tailwind CSS v4, and Framer Motion**.

---

## 🌟 Features Included

1. **Hero Landing Screen**: Sparkling starry background, handwriting name animations, floating heart flows, and a pulsating gift button.
2. **Animated Envelope & Letter**: A custom 3D envelope that flips open, revealing a letter that prints paragraph-by-paragraph with a typewriter effect.
3. **Floating Music Player**: Bottom-right floating controller with an audio equalizer bar visualizer.
4. **Live Birthday Countdown**: Interactive glowing countdown timer ticking down to Hema's birthday.
5. **Instagram-Style Gallery**: High-end grid layout with custom-tailored vector illustrations (fallback if no photos) and a fullscreen lightbox view.
6. **Milestone Journey Timeline**: Vertical timeline that automatically stacks on mobile, showing memories entering on scroll.
7. **"Reasons Why I Love You" Grid**: Interactive 3D flip cards revealing romantic definitions.
8. **Passcode Gated Vault**: Unlock screen requiring the password `"LOVE"` to reveal custom video and audio message players.
9. **Interactive Celebration**: A digital birthday cake with a candle flame you can click to blow out. Doing so triggers full-screen fireworks and confetti.
10. **Forever CTA Button**: Triggers additional heart showers and records count statistics.

---

## 🛠️ Personalization Guide

All personalization is controlled via a single file: `src/config.js`. You don't need to write code to customize this site!

Open `src/config.js` and modify any of the following fields:

### 1. General & Hero Text
- `girlfriendName`: Change `"Hema"` to any name you'd like.
- `title` & `subtitle`: Change the hero banners.

### 2. Background Music
- `music.url`: Direct path or internet link to an MP3 file (e.g., romantic piano music).

### 3. Love Letter Content
- `loveLetter.recipient`: Recipient line (e.g., `Dear My Love, Hema`).
- `loveLetter.paragraphs`: Array of strings for the letter body. Add as many paragraphs as you want.
- `loveLetter.closing`: Cursive closing signature.

### 4. Gallery Photos
- `memories.image`: Paste absolute image URLs or import relative assets. 
- *Note*: If left empty (`""`), the app will display beautiful built-in romantic vector art.

### 5. Timeline Milestones
- `timeline`: List of objects containing `date`, `title`, and `desc`. Add as many milestones as you'd like.

### 6. Reasons Why I Love You
- `reasons`: Customize the emoji, reason title, and the romantic description on the back of each 3D card.

### 7. Countdown Date
- `countdown.targetDate`: The target birthday date. It is set automatically to tomorrow's date by default, but you can hardcode it like `"2026-07-02T00:00:00"`.

### 8. Gated Surprise Vault
- `secret.password`: Passcode to unlock (e.g., `"LOVE"`).
- `secret.videoUrl`: Link to a sweet MP4 video.
- `secret.audioUrl`: Link to a voice note MP3 file.
- `secret.message`: Final romantic summary text.

---

## 🚀 Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or above recommended).

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally in Development Mode**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local link shown (usually `http://localhost:5173`).

3. **Build for Production**:
   ```bash
   npm run build
   ```
   This creates a optimized `dist` folder ready to be hosted.

---

## ☁️ Deployment (Vercel)

This application is ready to deploy to [Vercel](https://vercel.com/) with zero config.

1. Install Vercel CLI globally (optional):
   ```bash
   npm install -g vercel
   ```
2. Run in the root directory:
   ```bash
   vercel
   ```
3. Follow the prompt questions to log in and deploy your project.
4. Alternatively, push this folder to GitHub and import it on the Vercel Dashboard for automated CI/CD!
