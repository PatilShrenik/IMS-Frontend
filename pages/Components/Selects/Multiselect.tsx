import React, { useState, useEffect, useRef } from "react";

interface Option {
  value: string;
  label: string;
}
interface MultiSelectDropdownProps {
  options: Option[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (option: any) => {
    const isSelected = selectedOptions.some(
      (item) => item.value === option.value
    );
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((item) => item.value !== option.value)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const clearAllSelections = () => {
    setSelectedOptions([]);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div className="flex border justify-between py-1 items-center dark:bg-card-color dark:border-gray-800 border-gray-300 rounded overflow-hidden w-[20rem]">
        <div className="flex flex-wrap">
          {selectedOptions &&
            selectedOptions.map((option) => (
              <div
                key={option.value}
                className="bg-gray-200 px-3 py-1 m-1 rounded-full flex items-center dark:bg-dark-container dark:text-textColor"
              >
                {option.label}
                <button
                  className="ml-1 text-sm text-gray-600 focus:outline-none"
                  onClick={() => toggleOption(option)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          <input
            type="text"
            className="flex-grow px-2 py-1 dark:bg-card-color focus:border-transparent focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={
              selectedOptions && selectedOptions.length == 0 ? "Search..." : ""
            }
          />
        </div>
        {selectedOptions && selectedOptions.length > 0 && (
          <div className="flex  border-gray-300 dark:border-gray-800 py-1">
            <button
              className="text-blue-500 text-sm m-2 dark:text-textColor"
              onClick={clearAllSelections}
            >
              X
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute dark:bg-card-color bg-white border dark:border-gray-800 border-gray-300 mt-1 py-1 rounded w-full max-h-48 overflow-y-auto z-10">
          {options &&
            options
              .filter(
                (option: any) =>
                  option.label
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) &&
                  !selectedOptions.some((item) => item.value === option.value)
              )
              .map((option: any) => (
                <div
                  key={option.value}
                  className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-dark-container  cursor-pointer dark:text-textColor"
                  onClick={() => toggleOption(option)}
                >
                  {option.label}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
