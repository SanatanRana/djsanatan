import React from 'react'
import { Plus, ListCollapse } from 'lucide-react'

export default function ManagePackages() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-poppins">Manage Sound Packages</h2>
          <p className="text-slate-400 text-sm mt-1">Add, update, or remove live performance specifications and pricing catalogs.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md">
          <Plus className="w-4 h-4" />
          Create Sound Package
        </button>
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
        <div className="bg-brand-primary/10 p-4 rounded-full text-brand-primary">
          <ListCollapse className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-poppins">No Custom Packages Found</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            Your system database packages are loaded dynamically. Click the button above to define your first concert setup!
          </p>
        </div>
      </div>
    </div>
  )
}
