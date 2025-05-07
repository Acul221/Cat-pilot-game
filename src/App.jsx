// App.jsx
import { useState } from 'react';
import GameCanvas from './components/GameCanvas';

export default function App() {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="w-full h-full overflow-hidden relative bg-black">
      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <button
            className="px-6 py-3 bg-green-600 text-white text-xl font-bold rounded shadow"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button> 
        </div>
      )}
      {gameStarted && (
        <>
          <button
            className="absolute top-3 right-3 px-4 py-2 bg-red-600 text-white font-bold rounded z-50"
            onClick={() => setResetTrigger(prev => prev + 1)}
          >
            Reset
          </button>
          <GameCanvas resetTrigger={resetTrigger} />
        </>
      )}
    </div>
  );
}
