import React, { forwardRef } from 'react'

const InputField = forwardRef(({
  label,
  icon: Icon,
  error,
  type = 'text',
  placeholder,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-500 group-focus-within:text-brand-primary transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </span>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'px-4'} pr-4 py-3.5 bg-brand-bg-card border rounded-xl text-neutral-100 text-sm placeholder-neutral-600 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 transition-all duration-300 font-sans ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-neutral-800 hover:border-neutral-700'
          }`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-red-400 mt-0.5 animate-fade-in">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

InputField.displayName = 'InputField'

export default InputField
