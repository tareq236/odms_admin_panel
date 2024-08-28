import PageHeader from '@/components/ui/PageHeader'
import FilterSection from '@/components/user/attendence/FilterSection'
import { ListTodo } from 'lucide-react'
import React, { Suspense } from 'react'

export default async function UserAttendancePage() {
  return (
    <>
      <PageHeader title='User Attendance' icon={<ListTodo className='size-5 fill-primary/20' />} />

      <Suspense>
        <FilterSection />
      </Suspense>
    </>
  )
}
