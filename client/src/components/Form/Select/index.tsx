import React, { useCallback, useEffect, useState } from 'react';
import { Chevron } from '../../../assets/svgs';

export type DropdownItemType = {
  key: string;
  value: string;
};
export type DropdownType = {
  label: string;
  options: Array<DropdownItemType>;
  selected: string;
  error?: string;
  onSelect: any;
  disabled?: boolean;
};

export default ({
  label,
  options,
  selected = '',
  error,
  onSelect,
  disabled = false
}: DropdownType) => {
  const [selecting, setSelecting] = useState(false);
  const [filtered, setFiltered] = useState(options);

  useEffect(() => {
    setFiltered(options);
  }, [options]);

  const onClick = useCallback(
    () => !disabled && setSelecting(!selecting),
    [setSelecting, selecting, disabled]
  );

  return (
    <div className="relative space-y-2">
      <label className="text-tiny font-light mb-2">{label}</label>
      <button
        onClick={onClick}
        type="button"
        className="h-14 capitalize appearance-none w-full border border-light-500 py-3 px-4 rounded focus:outline-none font-light text-tiny text-dark-100 flex items-center justify-between rtl:flex-row-reverse"
      >
        <span>
          {options.filter(({ key }) => key === selected).map(({ value }) => value)}
        </span>
        <Chevron
            className={`w-2 transform transition-all ${selecting ? 'rotate-90' : '-rotate-90'}`}
        />
      </button>

      {!disabled && (
        <ul
          className={`shadow absolute top-22 z-20  w-full bg-white border border-light-500 rounded divide divide-y divide-light-500 ${
            selecting ? 'block' : 'hidden'
          }`}
        >
          {filtered.map(({ key, value }) => (
            <li
              className={`rounded-sm font-light text-tiny px-3 py-4 text-dark-400 hover:bg-light-100 cursor-pointer capitalize ${
                selected === key ? 'bg-light-200' : ''
              }`}
              key={key}
              onClick={() => {
                setSelecting(false);
                onSelect(key);
              }}
            >
              {value}
            </li>
          ))}
        </ul>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};
