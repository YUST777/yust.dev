'use client'

import { ReactNode, useEffect, createContext, useContext, useState, useCallback, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LenisContextType {
    lenis: Lenis | null
    stop: () => void
    start: () => void
}

const LenisContext = createContext<LenisContextType>({
    lenis: null,
    stop: () => { },
    start: () => { },
})

export const useLenis = () => useContext(LenisContext)

interface SmoothScrollProps {
    children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null)
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        // Initialize Lenis
        const lenisInstance = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenisInstance
        setLenis(lenisInstance)

        // Sync ScrollTrigger with Lenis
        lenisInstance.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Clean up
        return () => {
            lenisInstance.destroy()
        }
    }, [])

    const stop = useCallback(() => {
        lenisRef.current?.stop()
    }, [])

    const start = useCallback(() => {
        lenisRef.current?.start()
    }, [])

    return (
        <LenisContext.Provider value={{ lenis, stop, start }}>
            {children}
        </LenisContext.Provider>
    )
}
