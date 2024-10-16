import SearchDa from "@/components/constants/SearchDa";

export default function DaSummaryPage({
  searchParams,
}: {
  searchParams: { q: string; start: string };
}) {
  return <>{searchParams.q ? <>Profile</> : <SearchDa />}</>;
}
