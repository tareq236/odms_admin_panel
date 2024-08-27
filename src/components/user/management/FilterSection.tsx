'use client'

import { Button } from '@/components/ui/button'
import Search from '@/components/ui/Search'
import { Plus } from 'lucide-react'
import React from 'react'

export default function FilterSection() {
  return (
    <div className='filter-section'>
        <Search placeholder='Search by ID, name, mobile' />

        <Button>
            <Plus className='size-4 mr-2' />
            <span>Add</span>
        </Button>
    </div>
  )
}
