'use client'

import { formatNumber } from '@/lib/formatters'
import { useRouter } from 'next-nprogress-bar'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

type CardProps = {
    icon: React.ReactNode
    name: string
    stats: number
    paramString:string
}

function Card({icon, name, stats, paramString}: CardProps) {

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)


  return (
    <article className='flex gap-3 items-center border-r border-b px-4 py-2 cursor-pointer'
      onClick={() => {
        params.set('status', paramString)
        params.delete('p')
        router.push(pathname + '?' + params.toString())
      }}
    >
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