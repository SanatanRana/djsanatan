import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import authService from '../../services/auth.service'
import InputField from '../../components/forms/InputField'
import SelectField from '../../components/forms/SelectField'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: '', email: '', phone: '', role: 'CUSTOMER', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.register({
        fullName: data.fullName, email: data.email, phone: data.phone, password: data.password, role: data.role,
      })
      if (response.success) {
        toast.success(response.message || 'Registration successful! Please sign in.')
        navigate('/login')
      } else {
        toast.error(response.message || 'Registration failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg w-full animate-slide-up">
      <div className="glass-card-heavy p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="flex flex-col gap-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
          </div>
          <div>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Create Account</h2>
            <p className="text-on-surface-variant text-sm mt-1">Join the elite nightlife community</p>
          </div>
        </div>

        <form className="mt-8 flex flex-col gap-5 relative z-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Full Name" type="text" placeholder="Your Name" icon="person" error={errors.fullName} disabled={isLoading}
              {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Min 2 characters' } })} />
            <InputField label="Email Address" type="email" placeholder="you@example.com" icon="mail" error={errors.email} disabled={isLoading}
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Phone Number" type="tel" placeholder="9876543210" icon="call" error={errors.phone} disabled={isLoading}
              {...register('phone', { required: 'Phone is required', pattern: { value: /^\+?[0-9]{10,15}$/, message: '10-15 digits required' } })} />
            <SelectField label="Access Role" error={errors.role} disabled={isLoading}
              options={[{ value: 'CUSTOMER', label: 'Customer' }, { value: 'ADMIN', label: 'Admin' }]}
              {...register('role', { required: 'Role is required' })} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Password" type="password" placeholder="••••••••" icon="lock" error={errors.password} disabled={isLoading}
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} />
            <InputField label="Confirm Password" type="password" placeholder="••••••••" icon="lock" error={errors.confirmPassword} disabled={isLoading}
              {...register('confirmPassword', { required: 'Confirm password', validate: (val, fv) => val === fv.password || 'Passwords do not match' })} />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary-container font-extrabold text-sm py-4 rounded-lg hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider">
            {isLoading ? (
              <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Creating Account...</>
            ) : (
              <><span className="material-symbols-outlined text-lg">person_add</span> Create Free Account</>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6 relative z-10">
          <p className="text-on-surface-variant text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-secondary hover:underline font-bold ml-1 transition-colors duration-300">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
