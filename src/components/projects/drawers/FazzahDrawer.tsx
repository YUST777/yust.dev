import React from "react";

function FazzahDrawer() {
  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-2">
          Fazzah – Streetwear E-Commerce Store
        </h4>
        <p className="text-[12px] sm:text-sm text-gray-400">Role: Full-Stack Shopify Developer</p>
      </div>

      {/* Overview */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-info-circle mr-2"></i>Overview
        </h4>
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed">
          Fazzah is a modern streetwear brand launched to capitalize on the rising demand for
          high-quality hoodies and apparel. The client needed a rapid-deployment e-commerce solution
          to enter the market quickly without sacrificing quality.
        </p>
      </div>

      {/* Key Contributions */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <h4 className="text-base sm:text-lg md:text-xl font-display font-bold text-white mb-4">
          <i className="fas fa-tools mr-2"></i>Key Contributions
        </h4>
        <ul className="space-y-3 text-[13px] sm:text-sm text-gray-300">
          <li>
            <strong className="text-white">End-to-End Development:</strong> Built a comprehensive
            landing page and storefront using the Shopify ecosystem.
          </li>
          <li>
            <strong className="text-white">Logistics & Payments:</strong> Integrated a secure
            payment gateway and set up a backend warehouse management system to track inventory and
            orders.
          </li>
          <li>
            <strong className="text-white">Brand Identity:</strong> Designed a clean, minimalist GUI
            that highlights the products and aligns with current streetwear aesthetics.
          </li>
        </ul>
      </div>

      {/* Visit Project Button */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://fazzah.yousefdev.xyz/"
          className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Visit Fazzah</span>
          <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </>
  );
}

export default FazzahDrawer;
