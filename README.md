# 🐱 Cat Pilot Game

A simple React + Vite canvas-based rage platformer inspired by Cat Mario, with aviation-themed traps.

---

## 🧱 Tech Stack

- **React 18 + Vite 5**
- **Tailwind CSS**
- **HTML Canvas API**
- Assets stored in `/public/assets/` (images & sounds)

---

## 🚀 Getting Started

```bash
# Clone the repo (if from GitHub)
git clone https://github.com/your-user/cat-pilot-game.git
cd cat-pilot-game

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📁 Folder Structure

```
cat-pilot-game/
├── public/
│   └── assets/
│       ├── images/
│       └── sounds/
├── src/
│   ├── components/
│   │   ├── GameCanvas.jsx
│   │   └── HUD.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🔧 Tailwind Setup

```bash
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react
npx tailwindcss init -p
```

Update:
- `tailwind.config.js`
- `postcss.config.js`
- `index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ❓ Issues

- Blank screen? Check image paths in `GameCanvas.jsx`
- Sound not working? Ensure browser autoplay policy allows it
- Module errors? Run:

```bash
rm -rf node_modules
npm install
```