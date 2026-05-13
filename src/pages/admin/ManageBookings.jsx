import React, { useState, useEffect } from 'react'
import bookingService from '../../services/booking.service'
import { toast } from 'sonner'

export default function ManageBookings() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getAllBookings()
      setBookings(data.content ? data.content : data)
    } catch (error) {
      toast.error('Failed to fetch bookings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (b, newStatus) => {
    try {
      const payload = {
        packageId: b.packageId,
        eventType: b.eventType,
        eventDate: b.eventDate,
        startTime: b.startTime,
        endTime: b.endTime,
        eventLocation: b.eventLocation,
        guestCount: b.guestCount,
        advanceAmount: b.advanceAmount,
        specialNotes: b.specialNotes,
        bookingStatus: newStatus,
        paymentStatus: b.paymentStatus
      }
      await bookingService.updateBooking(b.id, payload)
      toast.success('Booking status updated')
      fetchBookings()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleDeleteBooking = async (id, eventType) => {
    if (window.confirm(`Are you sure you want to permanently delete booking for "${eventType}"? This action is irreversible.`)) {
      try {
        await bookingService.deleteBooking(id)
        toast.success('Booking purged successfully')
        fetchBookings()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete booking')
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Manage Bookings</h2>
        <p className="text-on-surface-variant text-sm mt-1">Accept or reject client booking requests.</p>
      </div>

      <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
        {isLoading ? (
           <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary">progress_activity</span></div>
        ) : bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant min-w-[800px]">
              <thead className="text-xs uppercase bg-white/5 text-on-surface">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Event</th>
                  <th className="px-4 py-3">Client details</th>
                  <th className="px-4 py-3">Schedule</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3 font-bold text-on-surface">{b.eventType}</td>
                    <td className="px-4 py-3 text-xs">
                      <p className="font-bold text-on-surface whitespace-nowrap">{b.userFullName} <span className="text-on-surface-variant font-normal tracking-widest text-[10px] uppercase ml-1">(ID: {b.userId})</span></p>
                      {b.userPhone && <p className="text-primary font-bold mt-0.5">{b.userPhone}</p>}
                      <p className="text-on-surface-variant mt-1 max-w-[200px] truncate" title={b.eventLocation}>{b.eventLocation}</p>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <p>{b.eventDate}</p>
                      <p>{b.startTime} - {b.endTime}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[10px] rounded uppercase font-bold tracking-widest ${b.bookingStatus === 'CONFIRMED' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs">Total: ₹{b.totalAmount}</p>
                      <p className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${b.paymentStatus === 'PAID' ? 'text-success' : 'text-secondary'}`}>{b.paymentStatus}</p>
                    </td>
                    <td className="px-4 py-3">
                      {b.bookingStatus === 'PENDING' && (
                        <div className="flex gap-2">
                          <button onClick={() => handleStatusUpdate(b, 'CONFIRMED')} className="bg-success/20 text-success hover:bg-success hover:text-white px-3 py-1 rounded text-xs font-bold transition">Accept</button>
                          <button onClick={() => handleStatusUpdate(b, 'CANCELLED')} className="bg-error/20 text-error hover:bg-error hover:text-white px-3 py-1 rounded text-xs font-bold transition">Reject</button>
                        </div>
                      )}
                      {b.bookingStatus === 'CONFIRMED' && (
                        <button onClick={() => handleStatusUpdate(b, 'COMPLETED')} className="bg-primary/20 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded text-xs font-bold transition">Complete</button>
                      )}
                      {['CANCELLED', 'REJECTED', 'COMPLETED'].includes(b.bookingStatus) && (
                        <button onClick={() => handleDeleteBooking(b.id, b.eventType)} className="bg-error/10 text-error hover:bg-error hover:text-white px-3 py-1 rounded text-xs font-bold transition flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">delete</span> Purge
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8 text-on-surface-variant text-sm">No bookings found.</div>
        )}
      </div>
    </div>
  )
}
