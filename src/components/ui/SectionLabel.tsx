interface SectionLabelProps {
  children: React.ReactNode
  index?: string
  className?: string
}

/**
 * Small all-caps section identifier.
 * Used above section headings to establish context and hierarchy.
 */
export function SectionLabel({ children, index, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && (
        <span className="text-label font-sans font-light text-text-tertiary tabular-nums">
          {index}
        </span>
      )}
      <span className="text-label font-sans font-medium uppercase tracking-[0.15em] text-text-tertiary">
        {children}
      </span>
    </div>
  )
}
