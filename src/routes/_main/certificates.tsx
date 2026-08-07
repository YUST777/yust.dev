import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, BrainCircuit, Cloud, Code2, Maximize2, ShieldCheck, Trophy, X } from "lucide-react";

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
  icon: typeof Award;
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
    icon: Trophy,
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
    icon: BrainCircuit,
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
    icon: ShieldCheck,
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
    icon: Code2,
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
    icon: Award,
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
    icon: Cloud,
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
  const Icon = certificate.icon;

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

        {/* Folder Cover Flap */}
        <span
          className={`absolute inset-x-1 bottom-0 top-5 flex origin-bottom flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${certificate.accent} bg-[#17181a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_24px_rgba(0,0,0,0.32)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen
              ? "[transform:perspective(900px)_rotateX(-58deg)_translateY(16px)]"
              : "[transform:perspective(900px)_rotateX(0deg)] group-hover:[transform:perspective(900px)_rotateX(-58deg)_translateY(16px)]"
          }`}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 text-sm font-semibold text-zinc-200 shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
            <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
            {certificate.mark}
          </span>
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
  const Icon = certificate.icon;

  return (
    <aside className="lg:sticky lg:top-28" aria-label="Selected certificate preview">
      <div className="relative mx-auto aspect-[1.42/1] w-full max-w-[560px] overflow-visible [perspective:1200px]">
        {/* Outer Folder Container */}
        <div className="absolute inset-x-[4%] bottom-[7%] top-[7%] rounded-2xl border border-white/10 bg-[#111214] shadow-[0_28px_75px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]" />

        {/* Certificate Paper Inside Folder */}
        <div
          key={certificate.id}
          onClick={onOpenFullscreen}
          className="group absolute bottom-[12%] left-[14%] right-[8%] top-[12%] animate-in fade-in zoom-in-95 duration-300 cursor-pointer overflow-hidden rounded-md bg-[#ebe8e1] p-2 text-[#252525] shadow-[0_18px_45px_rgba(0,0,0,0.46)] sm:p-3"
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-[#8d846e]/35 bg-white">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl">
                <Maximize2 className="h-3.5 w-3.5" /> Expand Certificate
              </span>
            </div>
          </div>
        </div>

        {/* 3D Opened Folder Cover Flap */}
        <div
          className={`absolute bottom-[7%] left-[4%] top-[7%] w-[30%] origin-left overflow-hidden rounded-l-2xl border border-white/10 bg-gradient-to-br ${certificate.accent} bg-[#1a1b1d] shadow-[18px_18px_45px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:perspective(1200px)_rotateY(-72deg)]`}
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-300">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              {certificate.mark}
            </span>
          </div>
        </div>

        <div className="absolute bottom-[2%] left-[8%] right-[3%] h-4 rounded-full bg-black/60 blur-xl" />
      </div>

      {/* Details Bar below Viewer */}
      <div className="mt-6 space-y-2 rounded-xl border border-white/10 bg-zinc-900/40 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-mono text-zinc-300">
            <Icon className="h-3.5 w-3.5 text-zinc-400" />
            {certificate.mark}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            {certificate.issued}
          </span>
        </div>
        <h2 className="text-base font-sans font-bold text-white tracking-tight">
          {certificate.title}
        </h2>
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[11px] font-mono text-zinc-500">
          <span>{certificate.issuer}</span>
          <span className="text-zinc-600">ID: {certificate.credentialId}</span>
        </div>
      </div>
    </aside>
  );
}
