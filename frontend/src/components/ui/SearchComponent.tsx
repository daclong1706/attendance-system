import { AiOutlineSearch } from "react-icons/ai";

interface SearchComponentProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  title,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <label htmlFor="search">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={title}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border-2 border-[#e7e7e7] bg-white px-4 py-2 pr-12 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
        >
          <AiOutlineSearch className="h-6 w-6" />
        </button>
      </div>
    </label>
  );
};

export default SearchComponent;
