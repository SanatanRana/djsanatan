import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Lock, Mail, Phone, User, Disc, ArrowRight } from 'lucide-react'
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
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: 'CUSTOMER',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.register({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      })

      if (response.success) {
        toast.success(response.message || 'Registration successful! Please sign in.')
        navigate('/login')
      } else {
        toast.error(response.message || 'Registration failed')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg w-full animate-slide-up">
      <div className="bg-brand-bg-card border border-neutral-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/8 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col gap-6 text-center">
          <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-3.5 rounded-2xl w-fit self-center shadow-lg shadow-brand-primary/20">
            <Disc className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Create Account</h2>
            <p className="text-neutral-500 text-sm mt-1">Join Rana DJ Events and create your personalized sound packages</p>
          </div>
        </div>

        <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Full Name"
              type="text"
              placeholder="Sanatan Rana"
              icon={User}
              error={errors.fullName}
              disabled={isLoading}
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
              })}
            />

            <InputField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email}
              disabled={isLoading}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="9876543210"
              icon={Phone}
              error={errors.phone}
              disabled={isLoading}
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[0-9]{10,15}$/,
                  message: 'Phone number must be between 10 and 15 digits',
                },
              })}
            />

            <SelectField
              label="Access Role"
              error={errors.role}
              disabled={isLoading}
              options={[
                { value: 'CUSTOMER', label: 'Customer (Book Packages)' },
                { value: 'ADMIN', label: 'Admin (Manage Events)' },
              ]}
              {...register('role', {
                required: 'Role selection is required',
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField
              label="Choose Secure Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              error={errors.password}
              disabled={isLoading}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              error={errors.confirmPassword}
              disabled={isLoading}
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (val, formValues) => {
                  if (val !== formValues.password) {
                    return 'Passwords do not match'
                  }
                },
              })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-primary to-amber-500 hover:from-brand-primary-deep hover:to-amber-600 text-white font-semibold text-sm py-4 rounded-xl shadow-lg shadow-brand-primary/15 transition-all duration-300 transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-brand-primary/25"
          >
            {isLoading ? (
              <>
                <Disc className="w-4.5 h-4.5 animate-spin text-white" />
                Creating Account...
              </>
            ) : (
              <>
                Create Free Account
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-neutral-800 pt-6">
          <p className="text-neutral-500 text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-primary hover:text-brand-primary-light hover:underline font-semibold ml-1 transition-colors duration-300">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
