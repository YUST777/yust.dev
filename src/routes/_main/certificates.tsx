import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Maximize2, X } from "lucide-react";

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

      <header className="space-y-4">
        <h1 className="font-pixel text-3xl uppercase tracking-[0.12em] text-white sm:text-4xl">
          Certificates
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          A file cabinet for official credentials, hackathon wins, and academic honors. Hover over a folder to open it, or click to view in full resolution.
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-zinc-500/70 to-transparent" />
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-14">
        <section
          aria-label="Certificate folders"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3"
        >
          {certificatePreviews.map((certificate) => (
            <CertificateFolder
              key={certificate.id}
              certificate={certificate}
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
  isOpen,
  onActivate,
  onHover,
  onLeave,
}: {
  certificate: CertificatePreview;
  isOpen: boolean;
  onActivate: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isOpen}
      aria-label={`Preview ${certificate.issuer} certificate folder`}
      onClick={onActivate}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="group min-w-0 text-left outline-none"
    >
      <span className="relative block aspect-[1.3/1] [perspective:900px]">
        <span className="absolute inset-x-1 bottom-0 top-4 rounded-xl border border-white/10 bg-[#111214] shadow-[0_14px_30px_rgba(0,0,0,0.35)]">
          <span className="absolute -top-4 left-0 h-6 w-[42%] rounded-t-xl border-x border-t border-white/10 bg-[#17181a]" />
        </span>

        {/* Certificate Paper Peek */}
        <span
          className={`absolute bottom-[8%] left-[10%] right-[10%] top-[10%] rounded-sm bg-[#e8e5de] p-1.5 text-[#242424] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out ${
            isOpen
              ? "-translate-y-[22%] rotate-[-1deg] opacity-100"
              : "translate-y-[13%] opacity-70 group-hover:-translate-y-[22%] group-hover:rotate-[-1deg] group-hover:opacity-100"
          }`}
        >
          <span className="flex h-full flex-col overflow-hidden border border-black/15">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="h-full w-full object-cover"
            />
          </span>
        </span>

        {/* Top Folder Cover Flap */}
        <span
          className={`absolute inset-x-1 bottom-0 top-5 flex origin-bottom flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${certificate.accent} bg-[#17181a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_rgba(0,0,0,0.32)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen
              ? "[transform:perspective(900px)_rotateX(-58deg)_translateY(16px)]"
              : "[transform:perspective(900px)_rotateX(0deg)] group-hover:[transform:perspective(900px)_rotateX(-58deg)_translateY(16px)]"
          }`}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      </span>

      <span className="mt-3 block truncate text-sm font-semibold text-zinc-100">
        {certificate.issuer}
      </span>
      <span className="mt-1 block text-[11px] text-zinc-500">{certificate.issued}</span>
    </button>
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
    <aside className="lg:sticky lg:top-28" aria-label="Selected certificate preview">
      <div className="relative mx-auto aspect-[1.38/1] w-full max-w-[620px] [perspective:1200px]">
        {/* Top Opened Flap (Open Lid) */}
        <div
          className="absolute -top-[16%] inset-x-0 h-[28%] origin-bottom overflow-hidden rounded-t-[22px] border border-white/10 bg-gradient-to-b from-[#1c1d20] to-[#141517] shadow-[0_-14px_40px_rgba(0,0,0,0.6)] [transform:perspective(1200px)_rotateX(-65deg)_translateY(-12px)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {/* Subtle center notch on flap */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-white/10" />
        </div>

        {/* Folder Frame Container */}
        <div className="relative h-full w-full rounded-[24px] border border-white/10 bg-[#131416] p-3.5 sm:p-4 shadow-[0_32px_90px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col">
          {/* Center tab notch behind paper */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-2.5 rounded-t-lg bg-[#18191c] border-t border-x border-white/10" />

          {/* Real Certificate Paper */}
          <div
            key={certificate.id}
            onClick={onOpenFullscreen}
            className="group relative flex-1 w-full overflow-hidden rounded-[14px] bg-[#f5f3ee] p-2.5 sm:p-3 text-[#252525] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-sm flex items-center justify-center">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                <span className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-4 py-2 text-xs font-semibold text-white shadow-xl hover:scale-105 transition-transform">
                  <Maximize2 className="h-4 w-4" /> Expand Certificate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient shadow beneath folder */}
        <div className="absolute -bottom-4 left-[6%] right-[6%] h-6 rounded-full bg-black/75 blur-2xl" />
      </div>
    </aside>
  );
}
