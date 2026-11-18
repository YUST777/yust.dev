import React from "react";

function WaddleDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Waddle – Learn Web Dev With a Duck
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-mobile-alt mr-2"></i>Full-Stack & Mobile Developer
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-amber-500 font-bold">Android App</span>
        </p>
      </div>

      {/* The Concept */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-lightbulb mr-2"></i>The Idea
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed font-medium">
          Most people quit learning to code because the first steps feel long and abstract. Waddle
          makes it five minutes a day: see a concept, try it right away with a live preview, and
          keep a streak going with a duck that cheers you on.
        </p>
      </div>

      {/* Capabilities */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>Key Features
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white font-display">Lessons That Teach First:</strong> Short
            HTML, CSS and JavaScript lessons with a live preview of every answer.
          </li>
          <li>
            <strong className="text-white font-display">Waddle AI:</strong> Ask when you are stuck
            and get answers with code you can run.
          </li>
          <li>
            <strong className="text-white font-display">Learn, Hatch, Merge:</strong> Streaks, XP,
            12 collectible 3D badges and a duck pond that grows with every lesson.
          </li>
        </ul>
      </div>

      {/* Technologies */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-microchip mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {["React", "Capacitor", "Supabase", "Three.js", "Tailwind CSS", "Vite"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono bg-zinc-900 border border-white/5 text-zinc-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/YUST777/waddle"
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span>View on GitHub</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </>
  );
}

export default WaddleDrawer;
