import { captureAttribution } from "./attributionStorage";
import { parseAttribution } from "./parseAttribution";

export function initializeAttribution(search: string, landingPath: string) {
  return captureAttribution(parseAttribution(search, landingPath));
}
