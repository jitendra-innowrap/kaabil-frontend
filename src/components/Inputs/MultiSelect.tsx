import React, { useState } from 'react';
import { default as ReactSelect, components, MultiValue, ActionMeta, SingleValue } from 'react-select';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';

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
  icon?: React.ReactNode; // Custom icon for the select component
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Select',
  isMulti = true,
  maxSelections,
  onChange,
  selectedValues,
  icon
}) => {
    const handleChange = (
        selectedOptions: MultiValue<OptionType> | SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
      ) => {
        // Ensure selectedOptions is an array before checking its length
        const selectedArray = Array.isArray(selectedOptions) ? selectedOptions : selectedOptions ? [selectedOptions] : [];
      
        if (maxSelections && selectedArray.length > maxSelections) {
          return; // Prevent selecting more than maxSelections
        }
        setTimeout(() => setMenuOpen(true), 0.01);
        onChange(selectedArray); // Ensure `onChange` gets an array
      };
      

  const Option = (props: any) => {
    const isSelected = selectedValues.some(role => role.value === props.data.value);
    return (
      <components.Option {...props}>
        <div className='relative flex items-center gap-2' onClick={() => handleChange([props.data], {} as ActionMeta<OptionType>)}>
          <input type="checkbox" className='!w-4 !h-4' checked={isSelected} readOnly />
          <label className='!mb-0'>{props.label}</label>
        </div>
      </components.Option>
    );
  };
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <ReactSelect
        options={options}
        isMulti={isMulti}
        components={{ Option }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        placeholder={placeholder}
        value={selectedValues}
        onChange={handleChange}
        className="react-select"
        menuIsOpen={menuOpen}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />
      {icon ? icon : <FaMagnifyingGlass className='absolute left-[15px] top-[20px] size-4 text-[#808080]' />}
    </div>
  );
};

export default MultiSelect;