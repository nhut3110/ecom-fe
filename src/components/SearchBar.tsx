import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ProductDetails } from "../constants";
import { FindProductType, PaginatedResponse } from "../services/types.api";

type SearchBarType = {
  queryFn: (params: FindProductType) => Promise<PaginatedResponse>;
};

const searchResultVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const SearchBar = ({ queryFn }: SearchBarType) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductDetails[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchResultRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);

  const debounceSearch = useCallback(
    debounce(async (title) => {
      const search = await queryFn({ title: title });

      setSearchResults(search.data);
      setIsSearching(!!title);
    }, 500),
    []
  );

  useEffect(() => {
    debounceSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        searchBarRef.current.contains(event.target as Node)
      )
        return;

      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching]);

  return (
    <div className="relative z-40">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        ref={searchBarRef}
      />
      <button
        onClick={() => setIsSearching(true)}
        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-600 focus:outline-none"
      >
        <BiSearch size={20} />
      </button>
      {isSearching && (
        <div
          className={`absolute mt-1 max-h-80 w-full overflow-y-scroll rounded-md border-2 border-gray-500 bg-white shadow-lg ${
            searchResults.length
              ? "scrollbar-thin scrollbar-thumb-gray-500"
              : "scrollbar-hide"
          }`}
          ref={searchResultRef}
        >
          {searchResults.length ? (
            searchResults.map((result) => (
              <motion.div
                key={result.id}
                variants={searchResultVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                <Link to={`/product/${result.id}`}>
                  <div
                    className="flex h-10 w-full items-center justify-between border-b-2 p-1"
                    onClick={() => setIsSearching(false)}
                  >
                    <p className="max-w-[80%] truncate">{result.title}</p>
                    <img src={result.image} alt="image" className="h-full" />
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="flex h-40 w-full items-center justify-center text-2xl italic text-gray-500">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
