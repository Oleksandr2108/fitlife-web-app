import type { ActivityPoint } from "../progress/calculateProgress";

export interface ChartDimensions {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
}

export interface ChartCoordinate {
  x: number;
  y: number;
  point: ActivityPoint;
}

export interface ActivityChartGeometry {
  coordinates: ChartCoordinate[];
  linePath: string;
  areaPath: string;
  baseline: number;
  yMaximum: number;
  yTicks: number[];
}

function niceMaximum(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 10;
  const roughStep = value / 3;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalized = roughStep / magnitude;
  const niceStep =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
    magnitude;
  return niceStep * 3;
}

export function createSmoothLinePath(coordinates: ChartCoordinate[]): string {
  if (coordinates.length === 0) return "";
  return coordinates.slice(1).reduce((path, point, index) => {
    const previous = coordinates[index];
    const midpoint = (previous.x + point.x) / 2;
    return `${path} C ${midpoint} ${previous.y}, ${midpoint} ${point.y}, ${point.x} ${point.y}`;
  }, `M ${coordinates[0].x} ${coordinates[0].y}`);
}

export function calculateActivityChartGeometry(
  points: ActivityPoint[],
  dimensions: ChartDimensions,
): ActivityChartGeometry {
  const { width, height, padding } = dimensions;
  const safeWidth = Number.isFinite(width)
    ? Math.max(width, padding.left + padding.right + 1)
    : padding.left + padding.right + 1;
  const safeHeight = Number.isFinite(height)
    ? Math.max(height, padding.top + padding.bottom + 1)
    : padding.top + padding.bottom + 1;
  const baseline = safeHeight - padding.bottom;
  const plotWidth = safeWidth - padding.left - padding.right;
  const plotHeight = baseline - padding.top;
  const yMaximum = niceMaximum(
    Math.max(0, ...points.map((point) => point.minutes)),
  );
  const coordinates = points.map((point, index) => ({
    x:
      padding.left +
      (points.length > 1
        ? (index / (points.length - 1)) * plotWidth
        : plotWidth / 2),
    y:
      baseline -
      (Math.min(yMaximum, Math.max(0, point.minutes)) / yMaximum) * plotHeight,
    point,
  }));
  const linePath = createSmoothLinePath(coordinates);
  const areaPath =
    coordinates.length > 0
      ? `${linePath} L ${coordinates.at(-1)?.x ?? padding.left} ${baseline} L ${coordinates[0].x} ${baseline} Z`
      : "";
  const yTicks = Array.from({ length: 4 }, (_, index) =>
    Math.round(yMaximum - (index / 3) * yMaximum),
  );

  return { coordinates, linePath, areaPath, baseline, yMaximum, yTicks };
}
