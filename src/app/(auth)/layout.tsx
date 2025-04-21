import React from 'react'

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='min-h-screen flex justify-center items-center w-full'>{children}</main>
  )
}

export default AuthLayout