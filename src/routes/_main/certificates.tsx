import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE_URL, buildRouteHead, jsonLdString, webPageSchema } from "@/lib/seo";

const TITLE = "Certificates & Credentials | Yousef Mohammed Salah";
const DESCRIPTION =
  "Browse Yousef Mohammed Salah's official certificates and credentials across AI, cybersecurity, hackathons, and software engineering.";

const certificatesPageSchema = webPageSchema({
  url: `${SITE_URL}/certificates`,
  name: TITLE,
  description: DESCRIPTION,
  type: "CollectionPage",
  breadcrumbs: [
    { name: "Home", url: SITE_URL },
    { name: "Certificates", url: `${SITE_URL}/certificates` },
  ],
});

export const Route = createFileRoute("/_main/certificates")({
  head: () => {
    const base = buildRouteHead({
      title: TITLE,
      description: DESCRIPTION,
      path: "/certificates",
    });

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: jsonLdString(certificatesPageSchema),
        },
      ],
    };
  },
  component: CertificatesPage,
});

type CertificatePreview = {
  id: string;
  issuer: string;
  mark: string;
  title: string;
  issued: string;
  credentialId: string;
  image: string;
  accent: string;
};

const certificatePreviews: CertificatePreview[] = [
  {
    id: "gdg-delta-hackathon",
    issuer: "Google Developers Group (GDG) Delta",
    mark: "GDG",
    title: "2nd Place Winner — Egypt Hackathon 4.0",
    issued: "Feb 2026",
    credentialId: "GDG-DELTA-2026-02",
    image: "/certi/gdg-delta-hackathon-4.webp",
    accent: "from-blue-400/20 to-sky-400/5",
  },
  {
    id: "luxsai-ai-hackathon",
    issuer: "Luxor University & Ministry of Higher Education",
    mark: "LUX",
    title: "3rd Place Winner — LUXSAI AI Hackathon",
    issued: "Mar 2026",
    credentialId: "LUXSAI-HACK-2026-03",
    image: "/certi/luxsai-ai-hackathon-winner.webp",
    accent: "from-purple-400/20 to-indigo-400/5",
  },
  {
    id: "sustainable-innovation-summit",
    issuer: "Tanta University",
    mark: "TNU",
    title: "3rd Place Nationwide — Sustainable Innovation Summit",
    issued: "Aug 2025",
    credentialId: "TANTA-SUMMIT-2025-08",
    image: "/certi/tanta-sustainable-innovation-summit.webp",
    accent: "from-emerald-400/20 to-teal-400/5",
  },
  {
    id: "iti-ai-ml-course",
    issuer: "Information Technology Institute (ITI)",
    mark: "ITI",
    title: "Machine Learning & AI Engineering Certificate",
    issued: "Jul 2026",
    credentialId: "ITI-AI-ML-2026-07",
    image: "/certi/iti-ai-ml-course.webp",
    accent: "from-amber-400/20 to-yellow-400/5",
  },
  {
    id: "horus-university-excellence",
    issuer: "Horus University In Egypt (HUE)",
    mark: "HUE",
    title: "Academic & Competitive Programming Excellence",
    issued: "2025 – 2026",
    credentialId: "HUE-ENG-2026",
    image: "/certi/horus-university-excellence.webp",
    accent: "from-sky-400/20 to-blue-400/5",
  },
  {
    id: "luxsai-ai-summit",
    issuer: "Luxor University National Summit",
    mark: "SUM",
    title: "LUXSAI AI Summit Honor & Appreciation",
    issued: "Mar 2026",
    credentialId: "LUXSAI-SUMMIT-2026",
    image: "/certi/luxsai-ai-summit-luxor.webp",
    accent: "from-violet-400/20 to-fuchsia-400/5",
  },
];

function CertificatesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenCert, setFullscreenCert] = useState<CertificatePreview | null>(null);

  const selectedCertificate = certificatePreviews[activeIndex];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold && activeIndex < certificatePreviews.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-44 space-y-8 sm:space-y-12 pb-40 sm:pb-32 overflow-x-clip">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Certificates", url: `${SITE_URL}/certificates` },
        ]}
      />

      <div>
        <h1 className="text-4xl font-pixel text-white uppercase">
          CERTIFICATES
        </h1>
      </div>

      <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-14">
        {/* Desktop Grid Layout */}
        <section
          aria-label="Certificate folders grid"
          className="hidden lg:grid lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10"
        >
          {certificatePreviews.map((certificate, index) => (
            <CertificateFolder
              key={certificate.id}
              certificate={certificate}
              isOpen={index === activeIndex}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </section>

        {/* Mobile Framer Motion 3-Item Carousel (1 Center 100%, 2 Sides 30% Opacity) */}
        <section aria-label="Certificate folders carousel" className="block lg:hidden select-none overflow-hidden w-full">
          <div className="relative flex flex-col items-center gap-3 w-full max-w-full">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative flex w-full max-w-full items-center justify-center overflow-hidden py-3 touch-pan-y"
            >
              <div className="flex w-full max-w-full items-center justify-between gap-1 sm:gap-3 px-1">
                {/* Left Folder (30% Opacity Inactive) */}
                {activeIndex > 0 ? (
                  <motion.div
                    key={`left-${activeIndex - 1}`}
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    animate={{ opacity: 0.3, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    whileTap={{ scale: 0.82 }}
                    className="w-[24%] max-w-[105px] shrink-0 cursor-pointer text-left opacity-30"
                  >
                    <CertificateFolderContent
                      certificate={certificatePreviews[activeIndex - 1]}
                      isOpen={false}
                    />
                  </motion.div>
                ) : (
                  <div className="w-[24%] max-w-[105px] shrink-0 opacity-0 pointer-events-none" />
                )}

                {/* Center Active Folder (100% Opacity Active) */}
                <motion.div
                  key={`center-${activeIndex}`}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="w-[48%] max-w-[190px] shrink-0 text-left"
                >
                  <CertificateFolderContent
                    certificate={certificatePreviews[activeIndex]}
                    isOpen={true}
                  />
                </motion.div>

                {/* Right Folder (30% Opacity Inactive) */}
                {activeIndex < certificatePreviews.length - 1 ? (
                  <motion.div
                    key={`right-${activeIndex + 1}`}
                    onClick={() => setActiveIndex(activeIndex + 1)}
                    animate={{ opacity: 0.3, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    whileTap={{ scale: 0.82 }}
                    className="w-[24%] max-w-[105px] shrink-0 cursor-pointer text-left opacity-30"
                  >
                    <CertificateFolderContent
                      certificate={certificatePreviews[activeIndex + 1]}
                      isOpen={false}
                    />
                  </motion.div>
                ) : (
                  <div className="w-[24%] max-w-[105px] shrink-0 opacity-0 pointer-events-none" />
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <CertificateViewer
          certificate={selectedCertificate}
          onOpenFullscreen={() => setFullscreenCert(selectedCertificate)}
        />
      </div>

      {/* Fullscreen Certificate Modal */}
      {fullscreenCert && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
          onClick={() => setFullscreenCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={fullscreenCert.title}
        >
          <button
            type="button"
            onClick={() => setFullscreenCert(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-white text-zinc-400 hover:text-black border border-white/10 hover:border-white shadow-2xl active:scale-95 transition-all duration-150 flex items-center justify-center group"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="flex flex-col items-center max-w-5xl w-full h-full max-h-[85vh] gap-4 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 flex items-center justify-center w-full">
              <img
                src={fullscreenCert.image}
                alt={fullscreenCert.title}
                loading="eager"
                decoding="async"
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
            <div className="text-center space-y-1 px-4">
              <h2 className="text-white font-sans font-bold text-base sm:text-xl">
                {fullscreenCert.title}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono">
                Issued by {fullscreenCert.issuer} · {fullscreenCert.issued}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CertificateFolder({
  certificate,
  isOpen,
  onActivate,
}: {
  certificate: CertificatePreview;
  isOpen: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={isOpen}
      aria-label={`Preview ${certificate.issuer} certificate folder`}
      onClick={onActivate}
      whileTap={{ scale: 0.97 }}
      className="group min-w-0 text-left outline-none"
    >
      <CertificateFolderContent certificate={certificate} isOpen={isOpen} />
    </motion.button>
  );
}

function CertificateFolderContent({
  certificate,
  isOpen,
}: {
  certificate: CertificatePreview;
  isOpen: boolean;
}) {
  return (
    <>
      <span className="relative block aspect-[1.3/1] [perspective:900px]">
        <span className="absolute inset-x-1 bottom-0 top-4 rounded-xl border border-white/10 bg-[#111214] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
          <span className="absolute -top-4 left-0 h-6 w-[42%] rounded-t-xl border-x border-t border-white/10 bg-[#17181a]" />
        </span>

        {/* Certificate Paper Peek (Snappy Spring Animation) */}
        <motion.span
          initial={false}
          animate={{
            y: isOpen ? "-22%" : "13%",
            rotate: 0,
            opacity: isOpen ? 1 : 0.75,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute bottom-[8%] left-[10%] right-[10%] top-[10%] rounded-sm bg-[#e8e5de] p-1.5 text-[#242424] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
        >
          <span className="flex h-full flex-col overflow-hidden border border-black/15">
            <img
              src={certificate.image}
              alt={certificate.title}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </span>
        </motion.span>

        {/* Top Folder Cover Flap (Snappy 3D Spring Animation) */}
        <motion.span
          initial={false}
          animate={{
            rotateX: isOpen ? -38 : 0,
            y: isOpen ? 10 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`absolute inset-x-1 bottom-0 top-5 flex origin-bottom flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${certificate.accent} bg-[#17181a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_rgba(0,0,0,0.32)]`}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.span>
      </span>

      <span className="mt-3 block truncate text-sm font-semibold text-zinc-100">
        {certificate.issuer}
      </span>
      <span className="mt-1 block text-[11px] text-zinc-500">{certificate.issued}</span>
    </>
  );
}

function CertificateViewer({
  certificate,
  onOpenFullscreen,
}: {
  certificate: CertificatePreview;
  onOpenFullscreen: () => void;
}) {
  return (
    <aside className="flex flex-col items-center justify-end h-full w-full mt-12 sm:mt-16 lg:mt-0 pt-6 sm:pt-8 lg:pt-0" aria-label="Selected certificate preview">
      {/* 3D Scene Container */}
      <div className="relative mx-auto aspect-[1.4/1] w-full max-w-[580px] px-1 sm:px-0 [perspective:2000px] group cursor-pointer">
        <div className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-out">
          
          {/* Folder Base (Back tray that holds the certificate) */}
          <div className="absolute inset-0 rounded-[18px] border border-[#2a2a2c] bg-[#1a1a1c] p-[2.5%] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_10px_20px_rgba(0,0,0,0.5)] z-10 flex flex-col">
            <div className="relative h-full w-full rounded-[10px] bg-[#0f0f11] p-[1.5%] shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] flex flex-col">
              
              {/* Real Certificate Paper with Fast Pixelated Retro Intro Effect */}
              <div
                onClick={onOpenFullscreen}
                className="relative flex-1 w-full overflow-hidden rounded-[6px] bg-[#fcfcfc] p-2 sm:p-3 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_0_40px_rgba(0,0,0,0.03)] cursor-pointer flex items-center justify-center"
              >
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0.2, filter: "blur(8px) contrast(220%)", scale: 1.03 }}
                  animate={{ opacity: 1, filter: "blur(0px) contrast(100%)", scale: 1 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative h-full w-full overflow-hidden rounded bg-white flex items-center justify-center"
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                  {/* Subtle pixel grid flash overlay on reveal */}
                  <motion.div
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]"
                  />
                </motion.div>
              </div>

            </div>
          </div>

          {/* Folder Cover (The part that hinges open upwards - responsive rotateX) */}
          <div
            className="absolute inset-x-0 top-0 h-[85%] origin-top rounded-[18px] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 [transform:rotateX(98deg)] sm:[transform:rotateX(108deg)] lg:[transform:rotateX(118deg)] shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Front Face (Outer Cover) */}
            <div className="absolute inset-0 rounded-[18px] border border-[#333] bg-gradient-to-br from-[#222225] to-[#151518] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] [backface-visibility:hidden] flex items-center justify-center">
              <div className="text-zinc-500 font-semibold tracking-wider text-xl uppercase font-mono">
                Certification
              </div>
            </div>

            {/* Back Face (Inner Lining of Cover) */}
            <div className="absolute inset-0 rounded-[18px] border border-[#222] bg-[#111] [transform:rotateX(180deg)] [backface-visibility:hidden] shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />
          </div>

        </div>
      </div>
    </aside>
  );
}
