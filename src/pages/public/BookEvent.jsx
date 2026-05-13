import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import availabilityService from '../../services/availability.service'
import packageService from '../../services/package.service'
import bookingService from '../../services/booking.service'
import useAuth from '../../hooks/useAuth'
import useSlotAvailability from '../../hooks/useSlotAvailability'
import InputField from '../../components/forms/InputField'
import SelectField from '../../components/forms/SelectField'

export default function BookEvent() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const preSelectedPackageId = searchParams.get('packageId')

  const [step, setStep] = useState(1)
  const [packages, setPackages] = useState([])
  const [selectedAdminId, setSelectedAdminId] = useState(null)
  
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [availabilityMessage, setAvailabilityMessage] = useState('')
  const [isAvailable, setIsAvailable] = useState(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lockTimer, setLockTimer] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)

  // Custom hook for WebSockets
  const { isSlotLocked } = useSlotAvailability(selectedAdminId)

  const generateTimeOptions = () => {
    const options = [{ value: '', label: 'Select Time' }]
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const ampm = h >= 12 ? 'PM' : 'AM'
        const hour12 = h % 12 || 12
        const hour24Str = h.toString().padStart(2, '0')
        const minStr = m.toString().padStart(2, '0')
        options.push({
          value: `${hour24Str}:${minStr}`,
          label: `${hour12}:${minStr} ${ampm}`
        })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  const { register, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm({
    defaultValues: {
      packageId: preSelectedPackageId || '',
      eventDate: '',
      startTime: '',
      endTime: '',
      eventType: '',
      eventLocation: '',
      guestCount: '',
      specialNotes: ''
    }
  })

  const packageIdValue = watch('packageId')
  const eventDateValue = watch('eventDate')
  const startTimeValue = watch('startTime')
  const endTimeValue = watch('endTime')

  useEffect(() => {
    if (packageIdValue && packages.length > 0) {
      const selectedPkg = packages.find(p => p.id === Number(packageIdValue))
      if (selectedPkg && selectedPkg.adminId) {
        setSelectedAdminId(selectedPkg.adminId)
      }
    }
  }, [packageIdValue, packages])

  useEffect(() => {
    if (isAvailable !== null) {
      setIsAvailable(null)
      setAvailabilityMessage('')
    }
  }, [eventDateValue, startTimeValue, endTimeValue, packageIdValue])

  // Timer countdown logic
  useEffect(() => {
    let interval = null;
    if (step === 3 && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (step === 3 && timeLeft === 0) {
      toast.error("Your reservation expired. Please try again.")
      releaseSlot()
      setStep(2)
    }
    return () => clearInterval(interval)
  }, [step, timeLeft])

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to book an event.')
      navigate('/login?redirect=/book')
    }

    const fetchPackages = async () => {
      try {
        const data = await packageService.getAllPackages()
        const packageList = data.content ? data.content : data
        setPackages(packageList.filter(pkg => pkg.active))
      } catch (err) {
        toast.error('Failed to load packages')
      }
    }
    fetchPackages()

    return () => {
      // Cleanup lock if unmounting
      releaseSlot()
    }
  }, [user, navigate])

  const releaseSlot = async () => {
    const { eventDate } = getValues()
    if (selectedAdminId && eventDate && step === 3) {
      try {
        await availabilityService.unlockSlot(selectedAdminId, eventDate)
      } catch (e) {
        console.error("Failed to unlock slot", e)
      }
    }
  }

  const handlePackageSelection = () => {
    const { packageId } = getValues()
    if (!packageId) {
      toast.error("Please select a package first.")
      return
    }
    setStep(2)
  }

  const checkAvailability = async () => {
    const { eventDate, startTime, endTime, packageId } = getValues()
    if (!eventDate || !startTime || !endTime) {
      toast.error('Please select date and time first')
      return
    }

    if (!selectedAdminId) {
      toast.error('Invalid Package. Missing Admin ID.')
      return
    }

    // Check frontend lock state via WebSockets first
    if (isSlotLocked(eventDate, startTime, endTime)) {
        toast.error('This slot is currently being booked by someone else. Please try again in 10 minutes.')
        return
    }

    setIsCheckingAvailability(true)
    try {
      const st = startTime.length === 5 ? `${startTime}:00` : startTime
      const et = endTime.length === 5 ? `${endTime}:00` : endTime
      
      const res = await availabilityService.checkAvailability(eventDate, st, et, selectedAdminId)
      setIsAvailable(res.available)
      setAvailabilityMessage(res.message)
      if (res.available) {
        // Attempt to lock slot
        try {
          await availabilityService.lockSlot(selectedAdminId, eventDate, st, et)
          toast.success('Awesome! Slot locked for 10 minutes.')
          setTimeLeft(600) // 10 minutes
          setStep(3)
        } catch (lockErr) {
          toast.error(lockErr.response?.data?.message || 'Someone just grabbed this slot! Please try again.')
        }
      } else {
        toast.error(res.message || 'Slot is unavailable')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error checking availability')
      setIsAvailable(false)
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  const onSubmitBooking = async (data) => {
    setIsSubmitting(true)
    try {
      const formattedData = {
        ...data,
        startTime: data.startTime.length === 5 ? `${data.startTime}:00` : data.startTime,
        endTime: data.endTime.length === 5 ? `${data.endTime}:00` : data.endTime,
        guestCount: parseInt(data.guestCount),
        advanceAmount: 0
      }

      await bookingService.createBooking(formattedData)
      toast.success('Booking Request Submitted successfully!')
      setStep(4) // Move to a success dummy step to prevent unlocking
      navigate('/customer/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit booking')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeLeft = () => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0')
    const s = (timeLeft % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="max-w-3xl w-full mx-auto px-6 animate-slide-up pb-24 pt-10">
      <div className="text-center mb-10">
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-primary mb-4">Book a DJ</h1>
        <p className="text-on-surface-variant">Lock in your premium sound and lighting experience.</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-10">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-primary text-on-primary-container shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-surface-variant text-on-surface-variant'}`}>1</div>
        <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-surface-variant'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-primary text-on-primary-container shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-surface-variant text-on-surface-variant'}`}>2</div>
        <div className={`h-1 w-8 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-surface-variant'}`}></div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-primary text-on-primary-container shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-surface-variant text-on-surface-variant'}`}>3</div>
      </div>

      <div className="glass-card-heavy p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        
        {step === 1 && (
          <div className="animate-fade-in flex flex-col gap-6 relative z-10">
            <h2 className="font-syne text-2xl font-bold text-on-surface mb-2">Select DJ Package</h2>
            <SelectField
              label="Select Package"
              error={errors.packageId}
              options={[
                { value: '', label: 'Select a package' },
                ...packages.map(p => ({ value: p.id, label: `${p.name} (By ${p.adminName}) - ₹${p.price}` }))
              ]}
              {...register('packageId', { required: 'Please select a package' })}
            />
            <button
              type="button"
              onClick={handlePackageSelection}
              className="mt-4 w-full bg-btn-gradient text-on-primary-container font-extrabold text-sm py-4 rounded-lg hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] active:scale-95 transition-all"
            >
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in flex flex-col gap-6 relative z-10">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-syne text-2xl font-bold text-on-surface">Check Availability</h2>
                <button type="button" onClick={() => setStep(1)} className="text-secondary text-sm font-bold hover:underline">Back</button>
            </div>
            
            {/* Show real-time WebSocket lock status if applicable */}
            {isSlotLocked(eventDateValue, startTimeValue, endTimeValue) && (
                <div className="p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm flex items-start gap-2 animate-pulse">
                    <span className="material-symbols-outlined">warning</span>
                    <span>Warning: Someone else is currently checking out this exact time slot!</span>
                </div>
            )}

            <InputField
              label="Event Date"
              type="date"
              icon="calendar_month"
              error={errors.eventDate}
              {...register('eventDate', { required: 'Event date is required' })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Start Time"
                options={timeOptions}
                error={errors.startTime}
                {...register('startTime', { required: 'Start time is required' })}
              />
              <SelectField
                label="End Time"
                options={timeOptions}
                error={errors.endTime}
                {...register('endTime', { required: 'End time is required' })}
              />
            </div>

            {isAvailable === false && (
              <div className="p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm flex items-start gap-2">
                <span className="material-symbols-outlined">error</span>
                <span>{availabilityMessage || 'This slot is already booked. Please choose another time.'}</span>
              </div>
            )}

            <button
              type="button"
              onClick={checkAvailability}
              disabled={isCheckingAvailability}
              className="mt-4 w-full bg-btn-gradient text-on-primary-container font-extrabold text-sm py-4 rounded-lg hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
            >
              {isCheckingAvailability ? (
                <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Locking Slot...</>
              ) : (
                <><span className="material-symbols-outlined text-lg">event_available</span> Check & Lock Slot</>
              )}
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmitBooking)} className="animate-fade-in flex flex-col gap-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-syne text-2xl font-bold text-on-surface">Event Details</h2>
              <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-error animate-pulse">
                      Slot Reserved: {formatTimeLeft()}
                  </span>
                  <button type="button" onClick={() => { releaseSlot(); setStep(2); }} className="text-secondary text-xs hover:underline mt-1">
                      Cancel & Unlock
                  </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/30 text-success text-sm flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined">check_circle</span>
              <span>Slot Locked: {watch('eventDate')} ({watch('startTime')} to {watch('endTime')})</span>
            </div>

            <InputField
              label="Event Type"
              type="text"
              placeholder="e.g. Wedding, Club Night, Corporate"
              icon="celebration"
              error={errors.eventType}
              {...register('eventType', { required: 'Event type is required' })}
            />

            <InputField
              label="Location / Venue Name"
              type="text"
              placeholder="Full address of the venue"
              icon="location_on"
              error={errors.eventLocation}
              {...register('eventLocation', { required: 'Location is required' })}
            />

            <InputField
              label="Estimated Guest Count"
              type="number"
              placeholder="200"
              icon="groups"
              error={errors.guestCount}
              {...register('guestCount', { required: 'Guest count is required', min: 1 })}
            />

            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Special Notes</label>
              <textarea
                className={`w-full bg-surface text-on-surface border border-white/10 rounded-lg p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[100px]`}
                placeholder="Any special requests or stage requirements?"
                {...register('specialNotes')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full bg-btn-gradient text-on-primary-container font-extrabold text-sm py-4 rounded-lg hover:shadow-[0_0_25px_rgba(76,215,246,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
            >
              {isSubmitting ? (
                <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Processing...</>
              ) : (
                <><span className="material-symbols-outlined text-lg">check_circle</span> Confirm Booking Request</>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
