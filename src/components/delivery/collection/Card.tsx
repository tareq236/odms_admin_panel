'use client'

import { formatNumber } from '@/lib/formatters'
import React from 'react'

type CardProps = {
    icon: React.ReactNode
    name: string
    stats: number
}

function Card({icon, name, stats}: CardProps) {
  return (
    <article className='flex gap-3 items-center border-r border-b px-4 py-2'>
        <div className="icon bg-blue-50 p-2 rounded text-primary">
            {icon}
        </div>

        <div className="description flex flex-col gap-0.5">
            <h4 className='text-muted-foreground text-xs'>{name}</h4>
            <h5 className='text-2xl'>{formatNumber(stats)}</h5>
        </div>
    </article>
  )
}

export default Card