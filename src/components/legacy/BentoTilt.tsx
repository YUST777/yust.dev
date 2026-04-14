'use client'

import { ReactNode } from 'react'

interface BentoTiltProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function BentoTilt({ children, className = '', onClick }: BentoTiltProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  )
}
