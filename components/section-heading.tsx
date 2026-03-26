type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-plum/70 dark:text-lilac/80">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-ink/70 dark:text-white/[0.68]">{description}</p>
      ) : null}
    </div>
  );
}
