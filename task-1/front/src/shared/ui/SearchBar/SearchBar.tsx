import { Search } from "lucide-react"

type SearchBarProps = {
  value: string
  onChange: (v: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="w-full mb-8 relative">
      <input
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3 rounded-full border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
      <Search className="w-5 h-5 text-[#432EAB] absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  )
}
