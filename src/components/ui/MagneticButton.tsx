'use client'

import { motion } from 'framer-motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import { useCursor } from '@/hooks/useCursor'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  intensity?: number
  variant?: 'outline' | 'ghost' | 'solid'
  className?: string
  target?: string
  rel?: string
}

/**
 * Reusable magnetic button / link.
 * The element shifts subtly toward the cursor when nearby.
 * On hover, triggers cursor 'hover-button' state.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  intensity = 0.4,
  variant = 'outline',
  className = '',
  target,
  rel,
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic({ intensity })
  const { setCursorState } = useCursor()

  const variantStyles = {
    outline: 'border border-text-primary text-text-primary hover:bg-text-primary hover:text-background',
    ghost: 'text-text-primary hover:text-text-secondary',
    solid: 'bg-text-primary text-background hover:bg-text-secondary',
  }

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-full
    text-body-sm font-sans font-medium tracking-[-0.01em]
    transition-colors duration-300
    select-none
    ${variantStyles[variant]}
    ${className}
  `

  const sharedProps = {
    style: { x, y },
    onMouseEnter: () => setCursorState('hover-button'),
    onMouseLeave: () => setCursorState('default'),
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseStyles}
        {...sharedProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={baseStyles}
      {...sharedProps}
    >
      {children}
    </motion.button>
  )
}
