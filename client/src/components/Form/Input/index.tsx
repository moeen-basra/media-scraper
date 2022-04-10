import React, { useRef, useState } from 'react';

type InputTypes =
  | 'text'
  | 'password'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'tel'
  | 'number';

export interface InputProps {
  name: string;
  placeholder?: string;
  value?: string;
  id?: string;
  type?: InputTypes;
  label?: any;
  checked?: boolean;
  readonly?: boolean;
  required?: boolean;
  autofocus?: boolean;
  help?: string;
  error?: any;
  maxLength?: number;
  canReveal?: boolean;
  stopTracking?: boolean;

  onChange?(event: any): void;

  onFocus?(event: any): void;

  onBlur?(event: any): void;

  onClick?(event: any): void;
}

export default ({
  name,
  placeholder,
  value = '',
  id,
  type = 'text',
  label,
  readonly = false,
  required = false,
  autofocus = false,
  help,
  error,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  onClick
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [autofill, setAutofill] = useState(false);

  return (
    <>
        <div className="space-y-2">
          <label className="text-tiny font-light">{label}</label>
          <input
            ref={inputRef}
            value={value}
            name={name}
            required={required}
            autoFocus={autofocus || isFocus}
            placeholder={placeholder}
            type={type}
            id={id || name}
            maxLength={maxLength}
            readOnly={readonly}
            autoComplete={autofill ? 'on' : 'off'}
            className="h-14 bg-white border border-light-500 text-dark-500 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:font-light placeholder:text-tiny placeholder:text-dark-100"
            onClick={(e) => {
              if (!readonly) {
                if (onClick) {
                  onClick(e);
                }
              }
            }}
            onChange={(e) => {
              setAutofill(false);
              if (readonly) {
                console.log('readonly');
              } else {
                if (onChange) {
                  onChange(e);
                }
              }
            }}
            onFocus={(e) => {
              setIsFocus(true);
              if (onFocus) {
                onFocus(e);
              }
            }}
            onBlur={(e) => {
              setIsFocus(false);
              if (onBlur) {
                onBlur(e);
              }
            }}
          />
          {help && <span className="block text-tiny text-red font-light !mt-1">{help}</span>}
          {error && <span className="block text-tiny text-red font-light !mt-1">{error}</span>}
        </div>
    </>
  );
};
