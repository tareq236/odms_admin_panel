import SearchDa from '@/components/constants/SearchDa';
import React from 'react'

export default function DAAttendancePage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  return <>{searchParams.q ? <>Attendance</> : <SearchDa />}</>;
}
