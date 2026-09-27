import { getRequestHeader } from "@tanstack/react-start/server";

export function isEgyptRequest(): boolean {
  const country = (
    getRequestHeader("x-vercel-ip-country") ??
    getRequestHeader("cf-ipcountry") ??
    ""
  )
    .trim()
    .toUpperCase();

  return country === "EG";
}
