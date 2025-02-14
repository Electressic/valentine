import { useState, useEffect, useCallback } from "react";
import backgroundImage from "./assets/cute.jpg";
import "./App.css";

export default function ValentineProposal() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showNoButton, setShowNoButton] = useState(true);

  const messages = [
    "Will you be my Valentine? 💝",
    "Are you absolutely sure? My heart yearns for you 💖",
    "Think about all our moments together! 💕",
    "My heart will shatter... 💔",
    "I'll bring you chocolate! 🍫",
    "And flowers too! 🌹",
    "Pretty please with sugar on top? 🎀",
    "I promise to love you forever! ✨",
  ];

  const createFloatingElement = useCallback((element: string) => {
    const floating = document.createElement("div");
    floating.classList.add("floating-element");
    floating.innerHTML = element;

    floating.style.left = Math.random() * 100 + "vw";
    floating.style.animationDuration = Math.random() * 2 + 3 + "s";

    document.body.appendChild(floating);

    setTimeout(() => floating.remove(), 5000);
  }, []);

  useEffect(() => {
    const elements = ["❤️", "💝", "💖", "💕", "💗", "🌹"];
    const interval = setInterval(() => {
      createFloatingElement(
        elements[Math.floor(Math.random() * elements.length)]
      );
    }, 100);
    return () => clearInterval(interval);
  }, [createFloatingElement]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    if (noCount >= messages.length - 1) {
      setShowNoButton(false);
    }
    const container = document.querySelector(".container-area");
    if (container) {
      const rect = container.getBoundingClientRect();
      setPosition({
        x: Math.random() * (rect.width - 100),
        y: Math.random() * rect.height * 2,
      });
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createFloatingElement("💝"), i * 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE6E6] relative flex justify-center items-center overflow-hidden px-4">
      <div className="text-center p-8 relative z-10 bg-white/40 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-rose-300">
        <img src={backgroundImage} width={600} alt="Background" />
        <div className="container-area relative">
          <h1 className="text-4xl md:text-6xl text-rose-600 mb-8 font-bold animate-pulse">
            {yesPressed ? "🎉 YAY! 🎉" : "My Dearest Valentine 💝"}
          </h1>

          {!yesPressed ? (
            <div className="flex flex-col gap-4 justify-center items-center">
              <p className="text-xl md:text-2xl text-rose-500 mb-8 font-serif">
                {messages[Math.min(noCount, messages.length - 1)]}
              </p>

              <div className="flex flex-col space-y-4">
                <button
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full text-xl shadow-lg transition transform hover:scale-110"
                  onClick={handleYesClick}
                >
                  Yes, I'd love to! 💝
                </button>

                {showNoButton && (
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 rounded-full text-xl transition transform"
                    onClick={handleNoClick}
                    style={{
                      position: noCount > 0 ? "absolute" : "relative",
                      left: position.x,
                      top: position.y,
                    }}
                  >
                    No 😢
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-2xl md:text-4xl text-rose-600 animate-bounce">
              You've made my heart complete! 💑
              <p className="mt-4 font-serif">❤️ Forever Yours ❤️</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
