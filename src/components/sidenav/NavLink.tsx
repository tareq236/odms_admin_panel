'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react'

type NavLinkProps = ComponentProps<"a"> & {
  icon: React.ReactNode,
  name: string
}

const NavLink = ({
    icon,
    name,
    href='',
    className,
    onClick, ...props
  }: NavLinkProps) => {
    const pathname = usePathname();
  

    return (
      <>
        <Link {...props}
          className={cn(`${
            href.split("?")[0] === pathname && "text-primary bg-primary/5"
          } text-sm flex gap-3 items-center p-2 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300`, className)}
          href={href}
          onClick={onClick}
        >
          {icon}
          <span>{name}</span>
        </Link>
      </>
    );
  };

export default NavLink