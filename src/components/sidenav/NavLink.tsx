'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react'

const NavLink = ({
    icon,
    name,
    href,
    onClick,
  }: {
    icon?: ReactNode;
    name: string;
    href: string;
    onClick?: () => void;
  }) => {
    const pathname = usePathname();
  
    return (
      <>
        <Link
          className={`${
            href.split("?")[0] === pathname && "text-primary bg-primary/5"
          } text-sm flex gap-3 items-center p-2 rounded hover:bg-primary/10 hover:text-primary transition-all duration-300`}
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