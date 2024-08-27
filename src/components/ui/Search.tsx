'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchIcon } from 'lucide-react'
import React from 'react'

function Search() {
  return (
    <div className='relative'>
        <Input type='search' name='search' id='search' className='pl-8 border-transparent min-w-[5rem] md:border-input' placeholder='Search...' />
        <Label htmlFor='search' className='absolute top-[50%] -translate-y-[50%] left-3 text-gray-400'>
            <SearchIcon className='size-4' />
        </Label>
    </div>
  )
}

export default Search