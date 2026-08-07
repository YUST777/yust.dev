import React from "react";

function SpaceWorthDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          SpaceWorth — AI Real Estate Valuation & CAD Intelligence
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">
          <i className="fas fa-graduation-cap mr-2"></i>ITI Machine Learning & AI Engineering Final Project
        </p>
        <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
          Status: <span className="text-green-400 font-bold">Live</span>
        </p>
      </div>

      {/* The Problem */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Traditional real estate pricing relies on manual inspections or simple linear heuristics that fail to capture location dynamics and architectural layout nuance. Converting engineering drawings, blueprints, or CAD floor-plan PDFs into valuation inputs requires tedious manual measurement.
        </p>
      </div>

      {/* The Solution */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-brain mr-2"></i>The Solution
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          SpaceWorth combines a custom-trained <strong className="text-white">90.64% R² Machine Learning price valuation ensemble</strong> (LightGBM + CatBoost + 3x PyTorch Entity Embedding Neural Networks) with multimodal CAD floor-plan OCR parsing (Gemini Flash) to deliver instant, verifiable real estate estimates.
        </p>
      </div>

      {/* Key Features */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-layer-group mr-2"></i>What Does SpaceWorth Provide?
        </h4>
        <ul className="space-y-4 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">90.64% R² Custom ML Model Engine:</strong> Trained from scratch on 57,058 Indian real estate listings. Combines target encoding, LightGBM, CatBoost, and 3x PyTorch Entity Embedding NNs hosted on Hugging Face.
          </li>
          <li>
            <strong className="text-white">CAD Floor-Plan Intelligence:</strong> Upload blueprints, CAD drawings, or architectural PDFs (PNG, JPG, PDF up to 12MB). Gemini extracts room counts, dimensions, and sqft directly into our valuation engine.
          </li>
          <li>
            <strong className="text-white">Interactive 2D/3D Konva Canvas:</strong> Dynamic floor-plan layout generator allowing users to add, drag, resize, measure, and preview room configurations in 2D and 3D.
          </li>
          <li>
            <strong className="text-white">Developer API Key Manager:</strong> Full API key lifecycle management stored in Supabase PostgreSQL with secret hashing and rate limiting.
          </li>
        </ul>
      </div>

      {/* Model Benchmark / Proof */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-chart-line mr-2"></i>Model Performance & Benchmarks
        </h4>
        <ul className="space-y-2 text-[13px] sm:text-sm text-gray-300">
          <li>• <strong className="text-white">Blended Ensemble (Selected):</strong> 90.64% R² Accuracy</li>
          <li>• <strong className="text-white">CatBoost Model:</strong> 88.40% R²</li>
          <li>• <strong className="text-white">PyTorch Entity Embedding NN:</strong> 86.90% R²</li>
          <li>• <strong className="text-white">LightGBM Model:</strong> 85.12% R²</li>
          <li>• <strong className="text-white">Ridge Regression Baseline:</strong> 79.59% R²</li>
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-laptop-code mr-2"></i>Technologies Used
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "PyTorch",
            "LightGBM",
            "CatBoost",
            "FastAPI",
            "React 18",
            "TypeScript",
            "Konva 2D/3D",
            "Supabase PostgreSQL",
            "Docker Compose",
            "Hugging Face",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white border border-white/20 uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Live Links */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col gap-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://spaceworth.site"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Visit SpaceWorth.site</span>
            <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://spaceworth.site/proof"
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fas fa-shield-alt text-amber-400"></i>
            <span>View Proof & Model Story</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/YUST777/spaceworth.site-ITI_AI_COURSE_PROJECT"
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 border border-white/10 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fab fa-github"></i>
            <span>Source Code on GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default SpaceWorthDrawer;
