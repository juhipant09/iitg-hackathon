import { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Optimizer() {
  const [mppt, setMppt] = useState(78)
  const [gridBlend, setGridBlend] = useState(24)

  const power = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    h: `${i}:00`,
    solar: Math.max(0, Math.sin((i/24)*Math.PI) * (600 + mppt) + 50),
    pump: 250 + (i%3===0?40:0) + Math.random()*30,
  })), [mppt])

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold tracking-tight">Energy Optimizer</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">MPPT Target (%)</div>
          <input type="range" min="50" max="100" value={mppt} onChange={e=>setMppt(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-gray-500">Current: {mppt}%</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">Grid Blend (%)</div>
          <input type="range" min="0" max="60" value={gridBlend} onChange={e=>setGridBlend(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-gray-500">Current: {gridBlend}%</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">Optimization Notes</div>
          <ul className="text-sm list-disc ml-4 text-gray-600 dark:text-gray-300">
            <li>Increase MPPT on high irradiance windows</li>
            <li>Reduce grid blend during off-peak</li>
            <li>Align pump duty cycle to solar curve</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
        <div className="font-medium mb-2">Solar vs Pump Power</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={power}>
              <XAxis dataKey="h" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <Tooltip />
              <Line dataKey="solar" stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Line dataKey="pump" stroke="#f5ad42" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
