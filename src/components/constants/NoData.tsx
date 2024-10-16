import { MessageSquareOff } from 'lucide-react'
import React from 'react'

function NoData() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-muted-foreground/80">
    <MessageSquareOff size={32} />
    <p className="text-xs">No data</p>
  </div>
  )
}

export default NoData