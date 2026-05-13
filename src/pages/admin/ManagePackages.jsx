import React, { useState, useEffect } from 'react'
import packageService from '../../services/package.service'
import { toast } from 'sonner'
import InputField from '../../components/forms/InputField'

export default function ManagePackages() {
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const defaultPackageState = {
    name: '',
    description: '',
    price: '',
    durationHours: '',
    features: '',
    isActive: true
  }

  const [newPackage, setNewPackage] = useState(defaultPackageState)

  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const data = await packageService.getAllPackages()
      setPackages(data.content ? data.content : data)
    } catch (error) {
      toast.error('Failed to fetch packages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...newPackage,
        price: parseFloat(newPackage.price),
        durationHours: parseFloat(newPackage.durationHours),
        features: newPackage.features.split(',').map(f => f.trim())
      }
      if (editingId) {
        await packageService.updatePackage(editingId, payload)
        toast.success('Package updated successfully')
      } else {
        await packageService.createPackage(payload)
        toast.success('Package created successfully')
      }
      setIsAdding(false)
      setEditingId(null)
      setNewPackage(defaultPackageState)
      fetchPackages()
    } catch (err) {
      toast.error(editingId ? 'Failed to update package' : 'Failed to create package')
    }
  }

  const handleEditClick = (pkg) => {
    setEditingId(pkg.id)
    setNewPackage({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      durationHours: pkg.durationHours,
      features: pkg.features ? pkg.features.join(', ') : '',
      isActive: pkg.active,
      active: pkg.active
    })
    setIsAdding(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setNewPackage(defaultPackageState)
  }

  const toggleActive = async (pkg) => {
    try {
      const payload = {
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        durationHours: pkg.durationHours,
        features: pkg.features,
        isActive: !pkg.active,
        active: !pkg.active
      }
      await packageService.updatePackage(pkg.id, payload)
      toast.success(pkg.active ? 'Package disabled' : 'Package enabled')
      fetchPackages()
    } catch (err) {
      toast.error('Failed to update package status')
    }
  }

  const handleDelete = async (pkg) => {
    if (window.confirm(`Are you sure you want to permanently delete "${pkg.name}"?`)) {
      try {
        await packageService.deletePackage(pkg.id)
        toast.success('Package deleted permanently')
        fetchPackages()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete package')
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-on-surface">Manage Packages</h2>
          <p className="text-on-surface-variant text-sm mt-1">Add, edit, or disable DJ packages.</p>
        </div>
        <button onClick={isAdding ? handleCancel : () => setIsAdding(true)} className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-primary/90 transition">
          <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
          {isAdding ? 'Cancel' : 'Add Package'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-card p-6 rounded-xl border border-primary/30 animate-slide-up">
          <h3 className="font-syne text-xl font-bold text-on-surface mb-4">
            {editingId ? 'Edit Package' : 'Create New Package'}
          </h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Package Name" value={newPackage.name} onChange={e => setNewPackage({...newPackage, name: e.target.value})} required />
            <InputField label="Price (₹)" type="number" value={newPackage.price} onChange={e => setNewPackage({...newPackage, price: e.target.value})} required />
            <InputField label="Duration (Hours)" type="number" value={newPackage.durationHours} onChange={e => setNewPackage({...newPackage, durationHours: e.target.value})} required />
            <InputField label="Features (comma separated)" value={newPackage.features} onChange={e => setNewPackage({...newPackage, features: e.target.value})} required placeholder="4K Sound, 2x Mics, Lighting" />
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1 mb-1 block">Description</label>
              <textarea className="w-full bg-surface text-on-surface border border-white/10 rounded-lg p-4 outline-none focus:border-primary transition-all" value={newPackage.description} onChange={e => setNewPackage({...newPackage, description: e.target.value})} required></textarea>
            </div>
            <button type="submit" className="md:col-span-2 bg-success text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-success/90 transition">
              {editingId ? 'Update Package' : 'Save Package'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
           <div className="col-span-full flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span></div>
        ) : packages.length > 0 ? (
          packages.map(pkg => (
            <div key={pkg.id} className={`glass-card p-6 rounded-xl flex flex-col gap-4 relative ${!pkg.active ? 'opacity-50 grayscale' : ''}`}>
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-syne text-xl font-bold text-on-surface leading-tight">{pkg.name}</h3>
                <div className="flex flex-col gap-2 items-end">
                  <button onClick={() => toggleActive(pkg)} className={`text-xs font-bold uppercase tracking-widest ${pkg.active ? 'text-error' : 'text-success'} hover:underline whitespace-nowrap`}>
                    {pkg.active ? 'Disable' : 'Enable'}
                  </button>
                  <button onClick={() => handleEditClick(pkg)} className="text-xs font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">edit</span> Edit
                  </button>
                  <button onClick={() => handleDelete(pkg)} className="text-xs font-bold uppercase tracking-widest text-error hover:underline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">delete</span> Delete
                  </button>
                </div>
              </div>
              <div className="text-secondary font-bold text-2xl font-syne">₹{pkg.price} <span className="text-xs text-on-surface-variant font-sans">/ {pkg.durationHours} hrs</span></div>
              <p className="text-xs text-on-surface-variant flex-grow">{pkg.description}</p>
              <div className="text-xs font-bold text-primary">{pkg.features?.length || 0} Features Included</div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-8 text-on-surface-variant text-sm">No packages found. Add one above.</div>
        )}
      </div>
    </div>
  )
}
