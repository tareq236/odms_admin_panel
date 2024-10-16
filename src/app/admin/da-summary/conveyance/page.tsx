import SearchDa from '@/components/constants/SearchDa';
import React from 'react'

export default function DaCoveyancePage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  return <>{searchParams.q ? <>Conveyance</> : <SearchDa />}</>;
}
