'use client'

import React, { useEffect, useRef } from 'react'
import styles from './style.module.css';

function CircularProgress({value}: {value: number}) {

  const progressRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const progressBar = progressRef.current
    progressBar?.style.setProperty('--progress', value+'%')

    if(value <= 20) {
      progressBar?.style.setProperty('--progress-clr', '#b91c1c')
    } else if(value <= 40)  {
      progressBar?.style.setProperty('--progress-clr', '#ea580c')
    } else if(value <= 60) {
      progressBar?.style.setProperty('--progress-clr', '#eab308')
    } else if(value <= 80) {
      progressBar?.style.setProperty('--progress-clr', '#84cc16')
    } else {
      progressBar?.style.setProperty('--progress-clr', '#059669')
    }

  }, [value])

  return (
    <div ref={progressRef} id='circular-progress' className={styles.progress}></div>
  )
}

export default CircularProgress