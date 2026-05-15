import React, { useState, useEffect } from 'react'
import paymentService from '../../services/payment.service'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'sonner'

export default function Transactions() {
  const { user, isAdmin } = useAuth()
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const data = await paymentService.getPaymentHistory()
      setPayments(data || [])
    } catch (err) {
      toast.error('Failed to load transaction history')
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate totals
  const totalAmount = payments
    .filter(p => p.paymentStatus === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingCount = payments.filter(p => p.paymentStatus === 'PENDING').length
  const successCount = payments.filter(p => p.paymentStatus === 'SUCCESS').length

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Transactions</h2>
        <p className="text-on-surface-variant text-sm mt-1">
          {isAdmin 
            ? 'Track platform-wide revenue streams and incoming payment flows.' 
            : 'Review your complete invoice and advance payment ledger.'}
        </p>
      </div>

      {/* Metric Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card hover-lift p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">
              {isAdmin ? 'Total Platform Revenue' : 'Total Amount Spent'}
            </p>
            <p className="text-xl font-bold text-on-surface mt-0.5 font-syne">
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              ) : (
                `₹${totalAmount.toLocaleString('en-IN')}`
              )}
            </p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Successful Receipts</p>
            <p className="text-xl font-bold text-on-surface mt-0.5 font-syne">
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              ) : (
                `${successCount} Payments`
              )}
            </p>
          </div>
        </div>

        <div className="glass-card hover-lift p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Pending Orders</p>
            <p className="text-xl font-bold text-on-surface mt-0.5 font-syne">
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
              ) : (
                `${pendingCount} Unresolved`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
        <h3 className="font-syne text-lg font-bold text-on-surface mb-2">Payment Ledger</h3>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
          </div>
        ) : payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-surface-variant min-w-[850px]">
              <thead className="text-xs uppercase bg-white/5 text-on-surface">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Transaction Details</th>
                  {isAdmin && <th className="px-4 py-3">Customer</th>}
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Paid Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3">
                      <p className="font-bold text-on-surface">Invoice #{p.id}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">Booking Ref: #{p.bookingId}</p>
                      <p className="text-[9px] text-on-surface-variant font-mono mt-0.5 truncate max-w-[180px]" title={p.razorpayOrderId}>
                        {p.razorpayPaymentId ? `Pay: ${p.razorpayPaymentId}` : `Order: ${p.razorpayOrderId}`}
                      </p>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <p className="font-bold text-on-surface text-xs">{p.customerName || '—'}</p>
                        <p className="text-[10px] text-on-surface-variant">{p.customerEmail || ''}</p>
                        <p className="text-[10px] text-on-surface-variant">{p.customerPhone || ''}</p>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <p className="font-bold text-on-surface text-xs">{p.eventType || '—'}</p>
                      <p className="text-[10px] text-on-surface-variant">{p.eventDate || ''}</p>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {p.paidAt ? (
                        <>
                          <p>{new Date(p.paidAt).toLocaleDateString()}</p>
                          <p className="text-on-surface-variant">{new Date(p.paidAt).toLocaleTimeString()}</p>
                        </>
                      ) : (
                        <span className="text-on-surface-variant">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-sans text-[10px] font-bold uppercase tracking-wider">
                        {p.paymentMethod || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-[9px] rounded uppercase font-bold tracking-widest ${
                        p.paymentStatus === 'SUCCESS' ? 'bg-success/20 text-success' : 
                        p.paymentStatus === 'EXPIRED' ? 'bg-red-500/20 text-red-400' : 
                        'bg-warning/20 text-warning'
                      }`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-syne font-bold text-on-surface">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-12">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">payments</span>
            <p className="text-on-surface-variant text-sm">No transactions logged in the system.</p>
          </div>
        )}
      </div>
    </div>
  )
}
