import Nav from '@/components/dashboard/nav/Nav';
import React from 'react'

export default async function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='relative h-full'>
        {/* nav */}
        <Nav />
        <main className='container my-6'>
            {children}
        </main>
    </div>
  )
}

