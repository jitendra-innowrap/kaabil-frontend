import React, { useEffect, useRef, useState } from "react";
import { default as ReactSelect, components } from "react-select";
import { FaMagnifyingGlass, FaChevronDown, FaChevronUp } from "react-icons/fa6";

export interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: OptionType[];
  placeholder?: string;
  isMulti?: boolean;
  maxSelections?: number;
  onChange: (selectedOptions: OptionType[]) => void;
  selectedValues: OptionType[];
  icon?: React.ReactNode;
  onInputChange?: any;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select",
  maxSelections,
  onChange,
  selectedValues,
  icon,
  onInputChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (selectedOption: OptionType) => {
    let updatedSelections = [...selectedValues];

    // Toggle selection
    if (updatedSelections.some((opt) => opt.value === selectedOption.value)) {
      updatedSelections = updatedSelections.filter(
        (opt) => opt.value !== selectedOption.value
      );
    } else {
      if (!maxSelections || updatedSelections.length < maxSelections) {
        updatedSelections.push(selectedOption);
      }
    }
    if(maxSelections && maxSelections !== updatedSelections.length ){
      setTimeout(() => setMenuOpen(true), 0.01); // Keep menu open
    }
    onChange(updatedSelections);
  };

  // Custom option with checkbox
  const Option = (props: any) => {
    const { data, innerRef, innerProps, isDisabled } = props;
    const isSelected = selectedValues.some((opt) => opt.value === data.value);

    // Close the menu icon when outside click
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

    return (
      <components.Option {...props}>
        <div
          ref={innerRef}
          {...innerProps}
          onClick={() => {
            if (!isDisabled) handleChange(data);
            setMenuOpen(false);
          }}
          className={`relative flex items-center gap-3 ${
            isDisabled ? "opacity-90 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            className={`w-4 h-4 sm:!w-3 sm:!h-3 ${
              isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
            checked={isSelected}
            readOnly
          />
          <label
            className={`text-[12px] sm:text-[14px] !mb-0 !p-0 ${isSelected ? "text-[#E31837]" : ""} ${
              isDisabled ? "text-[#231F20]" : ""
            } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {data.label}
          </label>
        </div>
      </components.Option>
    );
  };

  // Override DropdownIndicator to hide it
  const DropdownIndicator = () => null;

  const updatedOptions = options.map((opt) => ({
    ...opt,
    isDisabled:
      maxSelections &&
      selectedValues.length >= maxSelections &&
      !selectedValues.some((sel) => sel.value === opt.value),
  }));

  return (
    <div className="relative w-full">
      <ReactSelect
        options={updatedOptions}
        components={{ Option, DropdownIndicator }}
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        placeholder={placeholder}
        value={null} // Ensure the input does not display selected values
        onChange={() => {}} // Do nothing, since we handle selection manually
        className="react-select"
        menuIsOpen={menuOpen}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            // backgroundColor: isFocused
            //   ? "#f0f0f0" // Highlight background on hover
            //   : "",
            border: isFocused ? "1px solid red" : "",
            borderRadius: "5px",
            color: isSelected ? "#E31837" : "#231F20",
            cursor: "pointer",
            padding: "8px 15px",
          }),
        }}
        onInputChange={(inputValue) => {
          if (onInputChange) {
            onInputChange(inputValue); // Call the parent's handler
          }
        }}
      />
      <div
        className="absolute right-[20px] top-[14px] sm:top-[21px] cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? (
          <FaChevronUp className="size-4 text-[#333333]" />
        ) : (
          <FaChevronDown className="size-4 text-[#333333]" />
        )}
      </div>
      {icon && <div className="absolute left-[0px] top-[0px]">{icon}</div>}
    </div>
  );
};

export default MultiSelect;
