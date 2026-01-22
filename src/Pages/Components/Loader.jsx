import React, { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0b]">
      <div className="flex flex-col items-center gap-6">

        {/* Cup SVG */}
        <svg width="220" height="200" viewBox="0 0 220 200">
          
          {/* Steam */}
          <path
            d="M90 20 C80 0, 110 0, 100 20"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
            className="steam"
          />
          <path
            d="M115 20 C105 0, 135 0, 125 20"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
            className="steam delay-200"
          />
          <path
            d="M140 20 C130 0, 160 0, 150 20"
            stroke="#ccc"
            strokeWidth="2"
            fill="none"
            className="steam delay-400"
          />

          {/* Coffee fill mask */}
          <defs>
            <clipPath id="coffeeClip">
              <rect
                x="55"
                y={110 - progress * 0.6}
                width="110"
                height="90"
              />
            </clipPath>
          </defs>

          {/* Coffee */}
          <ellipse
            cx="110"
            cy="110"
            rx="52"
            ry="20"
            fill="#6f4e37"
            clipPath="url(#coffeeClip)"
          />

          {/* Cup outline */}
          <path
            d="M50 70 
               C45 120, 60 160, 110 160
               C160 160, 175 120, 170 70
               Z"
            stroke="#eee"
            strokeWidth="3"
            fill="none"
          />

          {/* Cup rim */}
          <ellipse
            cx="110"
            cy="70"
            rx="60"
            ry="18"
            stroke="#eee"
            strokeWidth="3"
            fill="none"
          />

          {/* Handle */}
          <path
            d="M170 90
               C200 90, 200 140, 170 140"
            stroke="#eee"
            strokeWidth="3"
            fill="none"
          />

          {/* Saucer */}
          <ellipse
            cx="110"
            cy="175"
            rx="80"
            ry="10"
            stroke="#eee"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Percentage */}
        <span className="text-neutral-300 tracking-widest text-sm">
          {progress}%
        </span>
      </div>

      <style>{`
        @keyframes steam {
          0% { opacity: 0; transform: translateY(6px); }
          50% { opacity: .6; }
          100% { opacity: 0; transform: translateY(-8px); }
        }

        .steam {
          animation: steam 2s ease-in-out infinite;
        }

        .delay-200 { animation-delay: .2s; }
        .delay-400 { animation-delay: .4s; }
      `}</style>
    </div>
  );
};

export default Loader;
