
interface PopularSearchesProps {
  onSearch: (query: string) => void
  searches?: string[]
}

export default function PopularSearches({
  onSearch,
  searches = ['Música', 'Buenos Aires', 'Fútbol'],
}: PopularSearchesProps) {
  return (
    <div className="mt-3.75 flex items-center gap-3.25 text-[11px] text-[#686673]">
      <span>Popular:</span>

      {searches.map((search) => (
        <button
          key={search}
          type="button"
          className="border-0 bg-transparent p-0 text-[11px] text-[#565375] underline"
          onClick={() => onSearch(search)}
        >
          {search}
        </button>
      ))}
    </div>
  )
}
