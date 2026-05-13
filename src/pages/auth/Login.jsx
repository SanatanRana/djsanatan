import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await authService.login(data.email, data.password)
      if (response.success && response.data) {
        toast.success(response.message || 'Login successful!')
        login(response.data.user, response.data.token)
        navigate(response.data.user.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard')
      } else {
        toast.error(response.message || 'Login failed')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials or connection error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full animate-slide-up">
      <div className="glass-card-heavy p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="flex flex-col gap-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center animate-float">
            <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>headphones</span>
          </div>
          <div>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm mt-1">Sign in to manage your premium event bookings</p>
          </div>
        </div>

        <form className="mt-8 flex flex-col gap-5 relative z-10" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            icon="mail"
            error={errors.email}
            disabled={isLoading}
            {...register('email', {
              required: 'Email address is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
            })}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••••••"
            icon="lock"
            error={errors.password}
            disabled={isLoading}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary-container font-bold text-sm py-4 rounded-lg hover:shadow-[0_0_20px_rgba(221,183,255,0.6)] active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            {isLoading ? (
              <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Signing In...</>
            ) : (
              <><span className="material-symbols-outlined text-lg">login</span> Sign In to Account</>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6 relative z-10">
          <p className="text-on-surface-variant text-xs">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary hover:text-secondary hover:underline font-bold ml-1 transition-colors duration-300">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
