'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'

interface ScopedSmoothScrollProps {
    children: React.ReactNode
    className?: string
}

export default function ScopedSmoothScroll({ children, className }: ScopedSmoothScrollProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        if (!wrapperRef.current) return

        const lenis = new Lenis({
            wrapper: wrapperRef.current, // Only pass wrapper to animate its scrollTop
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        const update = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(update)

        return () => {
            gsap.ticker.remove(update)
            lenis.destroy()
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            className={`relative ${className || ''}`}
        >
            {children}
        </div>
    )
}
