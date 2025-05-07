// src/components/HUD.jsx
export default function HUD({ lives }) {
    return (
      <div className="absolute top-3 left-3 text-white font-bold text-lg z-50">
        Lives: {lives}
      </div>
    );
  }
  