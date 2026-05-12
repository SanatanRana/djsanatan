import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Lock, Mail, Disc, ArrowRight } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import authService from '../../services/auth.service'
import InputField from '../../components/forms/InputField'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.login(data.email, data.password)
      if (response.success && response.data) {
        toast.success(response.message || 'Login successful!')
        login(response.data.user, response.data.token)

        if (response.data.user.role === 'ADMIN') {
          navigate('/admin/dashboard')
        } else {
          navigate('/customer/dashboard')
        }
      } else {
        toast.error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      const errorMsg = error.response?.data?.message || 'Invalid credentials or connection error'
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full animate-slide-up">
      <div className="bg-brand-bg-card border border-neutral-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/8 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl -z-10"></div>

        <div className="flex flex-col gap-6 text-center">
          <div className="bg-gradient-to-br from-brand-primary to-amber-500 p-3.5 rounded-2xl w-fit self-center shadow-lg shadow-brand-primary/20 animate-float">
            <Disc className="w-7 h-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Welcome Back</h2>
            <p className="text-neutral-500 text-sm mt-1">Sign in to manage your premium event bookings</p>
          </div>
        </div>

        <form className="mt-8 flex flex-col gap-5.5" onSubmit={handleSubmit(onSubmit)}>
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

          <InputField
            label="Password"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-primary to-amber-500 hover:from-brand-primary-deep hover:to-amber-600 text-white font-semibold text-sm py-4 rounded-xl shadow-lg shadow-brand-primary/15 transition-all duration-300 transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-brand-primary/25"
          >
            {isLoading ? (
              <>
                <Disc className="w-4.5 h-4.5 animate-spin text-white" />
                Signing In...
              </>
            ) : (
              <>
                Sign In to Account
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-neutral-800 pt-6">
          <p className="text-neutral-500 text-xs">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-brand-primary hover:text-brand-primary-light hover:underline font-semibold ml-1 transition-colors duration-300">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
