import { cn } from "@/shared/lib/cn"

type SectionHeadingProps = {
  label: string
  title: string
  className?: string
  titleClassName?: string
}

export const SectionHeading = ({
  label,
  title,
  className,
  titleClassName,
}: SectionHeadingProps) => (
  <div className={className}>
    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-600">
      {label}
    </p>
    <h2
      className={cn(
        "text-4xl font-bold leading-tight text-gray-900 md:text-5xl",
        titleClassName
      )}
    >
      {title}
    </h2>
  </div>
)
