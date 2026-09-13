import React from 'react';
import { Edit2 } from 'lucide-react';

export default function ChildProfileTab({
  childName,
  childAge,
  nutritionGoal,
  isEditingChild,
  setIsEditingChild,
  editName,
  setEditName,
  editAge,
  setEditAge,
  editGoal,
  setEditGoal,
  onSaveChildProfile
}) {
  return (
    <div className="bg-[#F0FDF4] rounded-3xl p-6 border border-emerald-200/80 shadow-2xs space-y-5">
      <div className="flex items-center justify-between border-b border-emerald-200/50 pb-3.5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
            Your Little Joy
          </span>
          <h2 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
            <span>👦 {childName}</span>
            <span className="text-xs font-bold text-emerald-700">({childAge} Years Old)</span>
          </h2>
        </div>

        {!isEditingChild && (
          <button
            onClick={() => setIsEditingChild(true)}
            className="text-xs font-black text-emerald-800 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs hover:bg-emerald-50 flex items-center gap-1 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Child Info &rarr;</span>
          </button>
        )}
      </div>

      {!isEditingChild ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-slate-400 font-bold block mb-1">Child Name</span>
            <span className="text-slate-900 font-black text-sm">{childName}</span>
          </div>
          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-slate-400 font-bold block mb-1">Age Milestone</span>
            <span className="text-slate-900 font-black text-sm">{childAge} Years Old</span>
          </div>
          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-slate-400 font-bold block mb-1">Nutrition Focus</span>
            <span className="text-emerald-700 font-black text-sm">{nutritionGoal}</span>
          </div>
        </div>
      ) : (
        <form onSubmit={onSaveChildProfile} className="space-y-4 bg-white p-5 rounded-2xl border border-emerald-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Child's Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Child's Age (Years)
              </label>
              <select
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
              >
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7 Years</option>
                <option value="8">8 Years</option>
                <option value="9+">9+ Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Primary Nutrition Focus
            </label>
            <select
              value={editGoal}
              onChange={(e) => setEditGoal(e.target.value)}
              className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
            >
              <option value="Growth & Immunity">Growth &amp; Immunity</option>
              <option value="Brain Health & Focus">Brain Health &amp; Focus</option>
              <option value="Healthy Weight Gain">Healthy Weight Gain</option>
              <option value="Digestion & Fibre">Digestion &amp; Fibre</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsEditingChild(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs"
            >
              Save Child Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
