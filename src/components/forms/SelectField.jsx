import React, { forwardRef } from 'react'

const SelectField = forwardRef(({
  label,
  error,
  options = [],
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-4 py-4 bg-black/40 border rounded-lg text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-sans ${
          error ? 'border-error focus:border-error focus:ring-error/50' : 'border-white/10 hover:border-white/20'
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface text-on-surface">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-medium text-error mt-0.5 animate-fade-in">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

SelectField.displayName = 'SelectField'
export default SelectField
