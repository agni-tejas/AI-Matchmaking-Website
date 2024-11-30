'use client'

import { useState, useEffect } from 'react'

export function useRotatingText(texts, interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % texts.length)
    }, interval)

    return () => clearInterval(timer)
  }, [texts, interval])

  return texts[currentIndex]
}

