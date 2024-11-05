import { ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const categories = ['All Categories', 'Men’s Fashion', 'Women’s Fashion', 'Kids', 'Accessories'];

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    console.log(`Search: "${searchInput}" in "${selectedCategory}"`);
  };

  return (
    <div className="flex items-center border-2 rounded overflow-visible shadow-lg">
      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen((prev) => !prev);
          }}
          style={{ width: '200px' }} // Cố định chiều rộng của nút dropdown
        >
          <span className="truncate">{selectedCategory}</span> {/* Đảm bảo chữ không tràn */}
          <ChevronDown size={18} />
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-20 left-0 mt-1 w-48 bg-white border rounded shadow-md">
            {categories.map((category) => (
              <li
                key={category}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        className="flex-1 px-4 py-2 border-l outline-none"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="bg-primary text-white border-primary px-6 py-2 hover:bg-primary-dark transition"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
