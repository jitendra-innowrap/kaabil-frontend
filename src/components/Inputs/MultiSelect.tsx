import React, { useState } from "react";
import { default as ReactSelect, components, MultiValue, ActionMeta } from "react-select";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select",
  maxSelections,
  onChange,
  selectedValues,
  icon,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (selectedOption: OptionType) => {
    let updatedSelections = [...selectedValues];

    // Toggle selection
    if (updatedSelections.some((opt) => opt.value === selectedOption.value)) {
      updatedSelections = updatedSelections.filter((opt) => opt.value !== selectedOption.value);
    } else {
      if (!maxSelections || updatedSelections.length < maxSelections) {
        updatedSelections.push(selectedOption);
      }
    }

    setTimeout(() => setMenuOpen(true), 0.01); // Keep menu open
    onChange(updatedSelections);
  };

  // Custom option with checkbox
  const Option = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isSelected = selectedValues.some((opt) => opt.value === data.value);

    return (
      <components.Option {...props}>
      <div ref={innerRef} {...innerProps} onClick={() => handleChange(data)}>
        <div className="relative flex items-center gap-2">
          <input type="checkbox" className="!w-4 !h-4" checked={isSelected} readOnly />
          <label className="!mb-0">{data.label}</label>
        </div>
      </div>
      </components.Option>
    );
  };

  return (
    <div className="relative w-full">
      <ReactSelect
        options={options}
        components={{ Option }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        placeholder={placeholder}
        value={null} // Ensure the input does not display selected values
        onChange={() => {}} // Do nothing, since we handle selection manually
        className="react-select"
        menuIsOpen={menuOpen}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />
      {icon ? icon : <FaMagnifyingGlass className="absolute left-[15px] top-[20px] size-4 text-[#808080]" />}
    </div>
  );
};

export default MultiSelect;
