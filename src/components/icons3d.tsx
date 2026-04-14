import React from 'react';

const Defs3D = () => (
  <defs>
    <linearGradient id="graphite-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#d4d4d8" />     {/* zinc-300 */}
      <stop offset="40%" stopColor="#71717a" />    {/* zinc-500 */}
      <stop offset="100%" stopColor="#3f3f46" />   {/* zinc-700 */}
    </linearGradient>
    <linearGradient id="edge-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
      <stop offset="15%" stopColor="rgba(255,255,255,0.1)" />
      <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
    </linearGradient>
    <filter id="drop-3d" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.8" />
    </filter>
  </defs>
);

export const Home3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    {/* Base 3D shape */}
    <path fill="url(#graphite-grad)" d="M12 2.5l-9.5 8h2.5v10h5v-6h4v6h5v-10h2.5L12 2.5z" />
    {/* Inner Edge Highlights to fake 3D bevel */}
    <path fill="url(#edge-highlight)" d="M12 2.5l-9.5 8h2.5v10h5v-6h4v6h5v-10h2.5L12 2.5z" />
  </svg>
);

export const Folder3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    <path fill="url(#graphite-grad)" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    <path fill="url(#edge-highlight)" d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

export const Briefcase3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    <path fill="url(#graphite-grad)" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    <path fill="url(#edge-highlight)" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
  </svg>
);

export const Search3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    <path fill="url(#graphite-grad)" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path fill="url(#edge-highlight)" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

export const Moon3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    <path fill="url(#graphite-grad)" d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 18.06 14 21 9.92 21 5.55 21 2 17.45 2 13.08c0-4.08 2.94-7.53 7.37-7.57z" />
    <path fill="url(#edge-highlight)" d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 18.06 14 21 9.92 21 5.55 21 2 17.45 2 13.08c0-4.08 2.94-7.53 7.37-7.57z" />
  </svg>
);

export const Star3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} filter="url(#drop-3d)">
    <Defs3D />
    <path fill="url(#graphite-grad)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <path fill="url(#edge-highlight)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
