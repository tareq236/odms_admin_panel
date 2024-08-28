import RangePicker from '@/components/ui/RangePicker'
import Search from '@/components/ui/Search'
import React from 'react'

export default function FilterSection() {
  return (
    <section className='my-6 flex justify-between items-center gap-5 flex-wrap'>
        {/* left */}
        <div className="left flex items-center gap-3 flex-wrap">
            {/* search by sap id */}
            <Search placeholder='Search by ID' />

            {/* date range */}
            <RangePicker />
        </div>

    </section>
  )
}
