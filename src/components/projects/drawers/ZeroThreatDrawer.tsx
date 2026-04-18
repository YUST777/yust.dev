import React from "react";

function ZeroThreatDrawer() {
  return (
  <>
    {/* Header */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
        Zero Threat – AI-Driven Cybersecurity Suite
      </h4>
      <p className="text-[12px] sm:text-sm text-gray-400">
        <i className="fas fa-calendar-alt mr-2"></i>August 1 – August 28, 2025
      </p>
      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
        <i className="fas fa-trophy mr-2"></i>3rd Place at the National Student Forum (Al-Multaqy
        Al-Qammy), Tanta University
      </p>
      <p className="text-[12px] sm:text-sm text-gray-400 mt-1">
        Role: Lead Web Developer & UI/UX Designer
      </p>
    </div>

    {/* The Achievement */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-trophy mr-2"></i>The Achievement
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
        This project secured 3rd place in a national competition featuring{" "}
        <strong className="text-white">20 universities from across Egypt</strong>. As freshmen from
        a private university, my team competed against and outperformed 4th and 5th-year Engineering
        and Computer Science seniors. Our project was evaluated and commended by the Dean of
        Computer Science and a Professor of Cybersecurity at Tanta University.
      </p>
    </div>

    {/* The Solution */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-lightbulb mr-2"></i>The Solution
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
        Zero Threat is a comprehensive security ecosystem combining a web platform, a browser
        extension, and a Windows application.
      </p>
    </div>

    {/* My Contribution */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-globe mr-2"></i>My Contribution (The Web Platform)
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-4">
        I led the development of the web interface using Next.js and React, focusing on a
        high-performance UI with smooth animations. Key features I implemented include:
      </p>
      <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
        <li>
          <strong className="text-white">Universal File Scanner:</strong> An integrated tool to scan
          various file types (ZIP, PNG, MP4) for hidden malware.
        </li>
        <li>
          <strong className="text-white">Web Security Tools:</strong> Built-in developer tools for
          open port scanning and vulnerability assessment (similar to OWASP ZAP).
        </li>
        <li>
          <strong className="text-white">Browser Extension:</strong> A companion extension to ensure
          safe downloads in real-time.
        </li>
      </ul>
    </div>

    {/* The Windows Agent */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-desktop mr-2"></i>The Windows Agent
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
        Developed by my teammate Abdelrahman Mohsen, the desktop client utilizes the YARA protocol
        and AI integration. In our benchmarks, it achieved a{" "}
        <strong className="text-white">90% detection rate</strong> across 90 test subjects,
        outperforming many traditional signature-based antivirus solutions.
      </p>
    </div>

    {/* Official Documentation */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-file-alt mr-2"></i>Official Documentation
      </h4>
      <p className="text-[12px] sm:text-sm text-gray-400 mb-4">
        Official posts from Tanta University and Horus University:
      </p>
      <ul className="space-y-3 text-sm">
        <li>
          <a
            href="https://www.facebook.com/share/p/1DAW9yMMH1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            <i className="fab fa-facebook"></i> Horus University Official Post
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/share/p/1XakrE3nLE/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            <i className="fab fa-facebook"></i> Tanta University Official Post
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/share/v/1HBLEF92ep/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            <i className="fab fa-facebook"></i> Award Ceremony Video (2:13)
          </a>
        </li>
      </ul>
    </div>

    {/* Visit Project Button */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <a
        href="https://zerothreat.yousefdev.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>Visit Zero Threat</span>
        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
      </a>
    </div>
  </>

  );
}

export default ZeroThreatDrawer;
