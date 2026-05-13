import React, { forwardRef } from 'react'

const InputField = forwardRef(({
  label,
  icon,
  error,
  type = 'text',
  placeholder,
  ...props
}, ref) => {
  const handleWrapperClick = (e) => {
    try {
      if (type === 'date' || type === 'time') {
        const inputElement = e.currentTarget.querySelector('input')
        if (inputElement && inputElement.showPicker) {
          inputElement.showPicker()
        }
      }
    } catch (err) {
      // Ignored if browser doesn't support showPicker
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant">
          {label}
        </label>
      )}
      <div className="relative group cursor-pointer" onClick={handleWrapperClick}>
        {icon && (
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-on-surface-variant group-focus-within:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </span>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-12' : 'px-4'} pr-4 py-4 bg-black/40 border rounded-lg text-white text-sm placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-sans ${
            error ? 'border-error focus:border-error focus:ring-error/50' : 'border-white/10 hover:border-white/20'
          }`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-error mt-0.5 animate-fade-in">
          {error.message || error}
        </span>
      )}
    </div>
  )
})

InputField.displayName = 'InputField'
export default InputField
