'use client'
import { useEffect, useState } from 'react'
import { animate, useMotionValue, useTransform } from 'framer-motion'

type Props = {
  value: number
  duration?: number
}

const AnimatedNumber = ({ value, duration = 1.5 }: Props) => {
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest).toLocaleString())
      },
    })

    return () => controls.stop()
  }, [value])

  return display
}

export default AnimatedNumber
