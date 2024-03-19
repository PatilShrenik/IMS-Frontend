import React, { useState } from "react";

const CustomInputWithChips = (props: any) => {
  const { onChange } = props;
  const [chips, setChips] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e: any) => {
    if (e.key === " " && inputValue.trim() !== "") {
      // Remove leading/trailing spaces and add chip
      setChips([...chips, inputValue.trim()]);
      setInputValue(""); // Clear input field
    }
  };

  const handleChipRemove = (chipIndex: any) => {
    const updatedChips = chips.filter((index: any) => index !== chipIndex);
    setChips(updatedChips);
  };

  return (
    <div className="items-center mx-4 my-4">
      <div className="flex flex-wrap">
        {chips && chips.map((chip: any, index: any) => (
          <div key={index} className="chip">
            {chip}
            <button
              type="button"
              className="remove-button"
              onClick={() => handleChipRemove(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          className="w-[18rem]  text-gray-400 border-primary border-[1px] rounded-lg dark:border-dark-border bg-transparent py-3 px-2 font-medium outline-none transition focus:border-primary2 active:border-primary2 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
          placeholder="Enter text and press space to create chip"
        />
      </div>
      <style jsx>{`
        .chip {
          display: inline-flex;
          align-items: center;
          background-color: #e0e7ff;
          color: #1a1a1a;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          margin: 0.25rem;
        }

        .remove-button {
          margin-left: 0.25rem;
          background: none;
          border: none;
          color: #777777;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .remove-button:hover {
          color: #333333;
        }
      `}</style>
    </div>
  );
};

export default CustomInputWithChips;
