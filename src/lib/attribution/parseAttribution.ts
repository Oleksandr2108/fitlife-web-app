import type { AttributionData } from "../../types";

const utmFields = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
  utm_term: "term",
} as const;

export function parseAttribution(
  search: string | URLSearchParams,
  landingPath: string,
  capturedAt = new Date().toISOString(),
): AttributionData | null {
  const params =
    typeof search === "string" ? new URLSearchParams(search) : search;
  const attribution: Partial<AttributionData> = {};

  for (const [parameter, field] of Object.entries(utmFields)) {
    const value = params.get(parameter)?.trim();
    if (value) attribution[field] = value;
  }

  if (Object.keys(attribution).length === 0) return null;
  return { ...attribution, capturedAt, landingPath };
}
