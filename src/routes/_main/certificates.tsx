import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
  const [selectedId, setSelectedId] = useState(certificatePreviews[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<CertificatePreview | null>(null);

  const selectedCertificate =
    certificatePreviews.find((certificate) => certificate.id === (hoveredId ?? selectedId)) ??
    certificatePreviews[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 pb-40 pt-8 sm:px-6 sm:pb-24 sm:pt-32">
      <Breadcrumbs
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Certificates", url: `${SITE_URL}/certificates` },
        ]}
      />

      <header>
        <h1 className="font-pixel text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">
          Certificates
        </h1>
      </header>

      <div className="grid items-stretch gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-14">
        <section
          aria-label="Certificate folders"
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10 lg:overflow-visible lg:pb-0"
        >
          {certificatePreviews.map((certificate, index) => (
            <CertificateFolder
              key={certificate.id}
              certificate={certificate}
              index={index}
              isOpen={certificate.id === (hoveredId ?? selectedId)}
              onActivate={() => setSelectedId(certificate.id)}
              onHover={() => setHoveredId(certificate.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </section>

        <CertificateViewer
          certificate={selectedCertificate}
          onOpenFullscreen={() => setFullscreenCert(selectedCertificate)}
        />
      </div>

      {/* Fullscreen Certificate Modal */}
      {fullscreenCert && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setFullscreenCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={fullscreenCert.title}
        >
          <button
            type="button"
            onClick={() => setFullscreenCert(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 w-10 h-10 rounded-full bg-zinc-900/80 hover:bg-white text-zinc-400 hover:text-black border border-white/10 hover:border-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group"
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
  index,
  isOpen,
  onActivate,
  onHover,
  onLeave,
}: {
  certificate: CertificatePreview;
  index: number;
  isOpen: boolean;
  onActivate: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={isOpen}
      aria-label={`Preview ${certificate.issuer} certificate folder`}
      onClick={onActivate}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="group min-w-0 text-left outline-none shrink-0 w-[150px] sm:w-[170px] snap-center lg:w-auto lg:shrink"
    >
      <span className="relative block aspect-[1.3/1] [perspective:900px]">
        <span className="absolute inset-x-1 bottom-0 top-4 rounded-xl border border-white/10 bg-[#111214] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
          <span className="absolute -top-4 left-0 h-6 w-[42%] rounded-t-xl border-x border-t border-white/10 bg-[#17181a]" />
        </span>

        {/* Certificate Paper Peek (Framer Motion Spring Animation) */}
        <motion.span
          initial={false}
          animate={{
            y: isOpen ? "-22%" : "13%",
            rotate: isOpen ? -2 : 0,
            opacity: isOpen ? 1 : 0.75,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="absolute bottom-[8%] left-[10%] right-[10%] top-[10%] rounded-sm bg-[#e8e5de] p-1.5 text-[#242424] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
        >
          <span className="flex h-full flex-col overflow-hidden border border-black/15">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="h-full w-full object-cover"
            />
          </span>
        </motion.span>

        {/* Top Folder Cover Flap (Framer Motion 3D Spring Animation) */}
        <motion.span
          initial={false}
          animate={{
            rotateX: isOpen ? -38 : 0,
            y: isOpen ? 10 : 0,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`absolute inset-x-1 bottom-0 top-5 flex origin-bottom flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${certificate.accent} bg-[#17181a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_rgba(0,0,0,0.32)]`}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.span>
      </span>

      <span className="mt-3 block truncate text-sm font-semibold text-zinc-100">
        {certificate.issuer}
      </span>
      <span className="mt-1 block text-[11px] text-zinc-500">{certificate.issued}</span>
    </motion.button>
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
    <aside className="flex flex-col justify-end h-full mt-12 sm:mt-16 lg:mt-0 pt-6 sm:pt-8 lg:pt-0" aria-label="Selected certificate preview">
      {/* 3D Scene Container */}
      <div className="relative mx-auto aspect-[1.4/1] w-full max-w-[680px] [perspective:2000px] group cursor-pointer">
        <div className="relative h-full w-full [transform-style:preserve-3d] [transform:rotateX(12deg)_translateY(-6px)] transition-transform duration-500 ease-out">
          
          {/* Folder Base (Back tray that holds the certificate) */}
          <div className="absolute inset-0 rounded-[18px] border border-[#2a2a2c] bg-[#1a1a1c] p-[2.5%] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_10px_20px_rgba(0,0,0,0.5)] z-10 flex flex-col">
            <div className="relative h-full w-full rounded-[10px] bg-[#0f0f11] p-[1.5%] shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] flex flex-col">
              
              {/* Real Certificate Paper */}
              <div
                key={certificate.id}
                onClick={onOpenFullscreen}
                className="relative flex-1 w-full overflow-hidden rounded-[6px] bg-[#fcfcfc] p-2 sm:p-3 shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_0_40px_rgba(0,0,0,0.03)] cursor-pointer flex items-center justify-center"
              >
                <div className="relative h-full w-full overflow-hidden rounded bg-white flex items-center justify-center">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Folder Cover (The part that hinges open upwards - responsive rotateX) */}
          <div
            className="absolute inset-x-0 top-0 h-[85%] origin-top rounded-[18px] [transform-style:preserve-3d] transition-transform duration-800 ease-[cubic-bezier(0.25,1,0.5,1)] z-20 [transform:rotateX(96deg)] sm:[transform:rotateX(106deg)] lg:[transform:rotateX(118deg)] group-hover:[transform:rotateX(108deg)] lg:group-hover:[transform:rotateX(125deg)] shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
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
