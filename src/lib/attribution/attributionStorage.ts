import { getStoredValue, setStoredValue } from "../storage";
import type { AttributionData } from "../../types";

const STORAGE_KEY = "fitlife-attribution";
const STORAGE_VERSION = 1;

export interface AttributionContext {
  firstTouch: AttributionData | null;
  currentTouch: AttributionData | null;
}

interface StoredAttributionEnvelope {
  version: typeof STORAGE_VERSION;
  context: AttributionContext;
}

const emptyContext: AttributionContext = {
  firstTouch: null,
  currentTouch: null,
};
let memoryContext = emptyContext;

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === "string";
}

function isAttributionData(value: unknown): value is AttributionData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<AttributionData>;
  return (
    typeof data.capturedAt === "string" &&
    typeof data.landingPath === "string" &&
    isOptionalString(data.source) &&
    isOptionalString(data.medium) &&
    isOptionalString(data.campaign) &&
    isOptionalString(data.content) &&
    isOptionalString(data.term)
  );
}

function readStoredContext(): AttributionContext | null {
  const value = getStoredValue<unknown>(STORAGE_KEY);
  if (!value || typeof value !== "object") return null;
  const envelope = value as Partial<StoredAttributionEnvelope>;
  if (envelope.version !== STORAGE_VERSION || !envelope.context) return null;
  const { firstTouch, currentTouch } = envelope.context;
  if (
    !(firstTouch === null || isAttributionData(firstTouch)) ||
    !(currentTouch === null || isAttributionData(currentTouch))
  )
    return null;
  return { firstTouch, currentTouch };
}

export function getAttributionContext(): AttributionContext {
  const stored = readStoredContext();
  if (stored) memoryContext = stored;
  return memoryContext;
}

export function captureAttribution(
  touch: AttributionData | null,
): AttributionContext {
  const current = getAttributionContext();
  if (!touch) return current;
  const next = {
    firstTouch: current.firstTouch ?? touch,
    currentTouch: touch,
  };
  memoryContext = next;
  setStoredValue<StoredAttributionEnvelope>(STORAGE_KEY, {
    version: STORAGE_VERSION,
    context: next,
  });
  return next;
}

export function resetAttributionMemoryForTests(): void {
  memoryContext = emptyContext;
}
