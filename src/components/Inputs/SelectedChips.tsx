import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface SelectedChipsProps {
  selectedValues: { value: string; label: string }[];
  onRemove: (value: string) => void;
}

const SelectedChips: React.FC<SelectedChipsProps> = ({ selectedValues, onRemove }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {selectedValues.map(role => (
        <div key={role.value} className="label-option selected flex items-center gap-2 bg-gray-200 px-3 py-1 rounded">
          {role.label}
          <span className="cursor-pointer" onClick={() => onRemove(role.value)}>
            <RxCross2 />
          </span>
        </div>
      ))}
    </div>
  );
};

export default SelectedChips;