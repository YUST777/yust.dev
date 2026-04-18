import React from "react";

function YousefDevDrawer() {
  return (
  <>
    {/* Description */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        About Project
      </h4>
      <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
        A developer focused on building practical tools and applications. Creating clean,
        well-architected solutions with a focus on user experience and impact.
      </p>
    </div>

    {/* Technologies */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-tools mr-2"></i>Expertise
      </h4>
      <div className="flex flex-wrap gap-2">
        {["Full-Stack Development", "Cybersecurity", "Automation"].map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* Features */}
    <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
      <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
        <i className="fas fa-star mr-2"></i>Services
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="text-sm font-bold text-white/80 mb-2">
            <i className="fas fa-code mr-2"></i>Services
          </h5>
          <ul className="space-y-1 text-[13px] sm:text-sm text-gray-300">
            <li>• Web development</li>
            <li>• Application development</li>
            <li>• System design</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-bold text-white/80 mb-2">
            <i className="fas fa-bullseye mr-2"></i>Expertise
          </h5>
          <ul className="space-y-1 text-[13px] sm:text-sm text-gray-300">
            <li>• Full-stack development</li>
            <li>• Web applications</li>
            <li>• Automation systems</li>
          </ul>
        </div>
      </div>
    </div>
  </>

  );
}

export default YousefDevDrawer;
