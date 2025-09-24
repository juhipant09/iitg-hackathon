import { useMemo, useState } from 'react'
import { Power, Filter } from 'lucide-react'

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className={`px-3 py-1 rounded-md text-sm border transition ${checked ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'}`}>
      {checked ? 'Running' : 'Idle'}
    </button>
  )
}

const TYPES = ['submersible','surface']

export default function Pumps() {
  const [pumps, setPumps] = useState(() => Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    type: i % 3 === 0 ? 'surface' : 'submersible',
    depth: Math.round(20 + Math.random() * 40),
    flow: Math.round(80 + Math.random() * 220),
    power: Number((5 + Math.random() * 15).toFixed(1)),
    running: Math.random() > 0.3,
  })))
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('id')

  const filtered = useMemo(() => {
    let arr = pumps
    if (statusFilter !== 'all') arr = arr.filter(p => p.running === (statusFilter === 'running'))
    if (typeFilter !== 'all') arr = arr.filter(p => p.type === typeFilter)
    if (sortBy === 'power') arr = [...arr].sort((a,b) => b.power - a.power)
    if (sortBy === 'flow') arr = [...arr].sort((a,b) => b.flow - a.flow)
    if (sortBy === 'depth') arr = [...arr].sort((a,b) => b.depth - a.depth)
    if (sortBy === 'id') arr = [...arr].sort((a,b) => a.id - b.id)
    return arr
  }, [pumps, statusFilter, typeFilter, sortBy])

  const togglePump = (id, value) => {
    setPumps(prev => prev.map(p => p.id === id ? { ...p, running: value } : p))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Filter size={16} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="idle">Idle</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="all">All Types</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="id">Sort: ID</option>
            <option value="power">Sort: Power</option>
            <option value="flow">Sort: Flow</option>
            <option value="depth">Sort: Depth</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className={`rounded-xl p-4 shadow-soft border ${p.running ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-400/5 dark:border-emerald-900/30' : 'border-rose-200 bg-rose-50/50 dark:bg-rose-400/5 dark:border-rose-900/30'}`}>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Pump #{p.id}</div>
              <Toggle checked={p.running} onChange={(v) => togglePump(p.id, v)} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Type: <span className="font-medium">{p.type}</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Depth: <span className="font-medium">{p.depth} m</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Flow: <span className="font-medium">{p.flow} L/min</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Power: <span className="font-medium">{p.power} kW</span></div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Power size={14} className={p.running ? 'text-green-600' : 'text-rose-600'} />
              <span className={p.running ? 'text-green-700 dark:text-green-300' : 'text-rose-700 dark:text-rose-300'}>
                {p.running ? 'Running' : 'Idle'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
