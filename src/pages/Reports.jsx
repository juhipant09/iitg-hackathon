import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function Reports() {
  const costTrend = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    saving: Math.round(40000 + i * 2500 + Math.random() * 3000),
  })), [])

  const carbonTrend = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    reduced: Math.round(4 + i * 0.3 + Math.random() * 0.5),
  })), [])

  const download = (type) => {
    const blob = new Blob([`Mock ${type} content`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report.${type}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-md bg-mining-accent/90 text-black hover:bg-mining-accent" onClick={() => download('csv')}>Download CSV</button>
        <button className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5" onClick={() => download('pdf')}>Download PDF</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Cost Savings Trend (₹)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrend}>
                <defs>
                  <linearGradient id="cost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5ad42" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f5ad42" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Area dataKey="saving" stroke="#f5ad42" fill="url(#cost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Carbon Emissions Reduced (tons CO₂)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={carbonTrend}>
                <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line dataKey="reduced" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
