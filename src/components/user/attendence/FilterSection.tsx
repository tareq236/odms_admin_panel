import { Button } from '@/components/ui/button'
import RangePicker from '@/components/ui/RangePicker'
import Search from '@/components/ui/Search'
import { Plus } from 'lucide-react'
import React from 'react'

function FilterSection() {
  return (
    <section className='my-6 flex justify-between items-center gap-5 flex-wrap'>
        {/* left */}
        <div className="left flex items-center gap-3 flex-wrap">
            {/* search by sap id */}
            <Search placeholder='Search by ID' />

            {/* date range */}
            <RangePicker />
        </div>

        {/* right */}
        <div className="right">
            {/* buttons */}
            <Button>
                <Plus className='size-4 mr-2'/>
                <span>Add</span>
            </Button>
        </div>
    </section>
  )
}

export default FilterSection