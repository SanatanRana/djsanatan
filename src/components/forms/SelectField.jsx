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
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-4 py-3.5 bg-brand-bg-card border rounded-xl text-neutral-100 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all duration-300 font-sans ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-neutral-800 hover:border-neutral-700'
        }`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-neutral-900 text-neutral-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs font-medium text-red-400 mt-0.5 animate-fade-in">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

SelectField.displayName = 'SelectField'

export default SelectField
