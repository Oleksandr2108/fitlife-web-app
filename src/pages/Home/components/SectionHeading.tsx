interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-meta uppercase text-accent">{eyebrow}</p>
      <h2 className="text-section-title mt-3 text-text-primary">{title}</h2>
      {description ? (
        <p className="text-body mt-3 text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
