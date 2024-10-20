import GatePassTable from '@/components/da-summary/gate-pass/GatePassTable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatNumber } from '@/lib/formatters'
import React from 'react'

function GatePassSummaryPage() {
  return (
    <section className='flex flex-col gap-8'>
      {/* overview */}
      <GatePassTable/>

      {/* single gate pass */}
      <GatePassTable/>
      
    </section>
  )
}

export default GatePassSummaryPage