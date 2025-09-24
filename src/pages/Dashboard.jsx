import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, Droplets, Leaf, Sun, Gauge } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

function useLiveNumber(initial, minDelta, maxDelta, min=0, max=999999) {
  const [value, setValue] = useState(initial)
  useEffect(() => {
    const t = setInterval(() => {
      setValue(v => {
        const delta = (Math.random() * (maxDelta - minDelta) + minDelta) * (Math.random() > 0.5 ? 1 : -1)
        const next = Math.max(min, Math.min(max, v + delta))
        return Math.round(next)
      })
    }, 1200)
    return () => clearInterval(t)
  }, [])
  return value
}

function Card({ icon: Icon, title, value, suffix }) {
  return (
    <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <Icon className="text-mining-accent" size={18} />
        <span>{title}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}{suffix}</div>
    </div>
  )
}

export default function Dashboard() {
  const totalSolar = useLiveNumber(125000, 100, 800, 100000, 300000)
  const dieselSaved = useLiveNumber(830, 1, 5, 600, 2000)
  const costSaved = useLiveNumber(215000, 500, 2000, 150000, 600000)
  const carbonReduced = useLiveNumber(72, 0.1, 0.6, 50, 200)
  const totalDewatered = useLiveNumber(12800, 5, 40, 8000, 50000)
  const solarKW = useLiveNumber(420, 5, 20, 100, 800)
  const activePumps = useLiveNumber(11, 0, 1, 0, 16)
  const waterDepth = useLiveNumber(38, 0.1, 0.6, 15, 60)

  const timeSeries = useMemo(() => {
    const now = Date.now()
    return Array.from({ length: 24 }, (_, i) => {
      const t = new Date(now - (23 - i) * 60 * 60 * 1000)
      return {
        time: `${t.getHours()}:00`,
        solar: Math.max(0, Math.sin((i / 24) * Math.PI) * 600 + Math.random() * 40),
        pump: 200 + Math.random() * 80 + (i % 3 === 0 ? 40 : 0),
        level: 40 - Math.sin((i / 12) * Math.PI) * 6 + Math.random() * 1.5,
      }
    })
  }, [])

  const mode = solarKW > 300 ? 'Solar' : solarKW > 150 ? 'Hybrid' : 'Grid'

  return (
    <div className="space-y-8 p-0">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 shadow-soft bg-gradient-to-br from-amber-100 via-white to-white dark:from-amber-500/10 dark:via-mining-card dark:to-mining-card p-6 md:p-8">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-wider text-amber-700/70 dark:text-amber-300">Welcome to</div>
          <div className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">SolarSiphon</div>
          <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 ">Design and implementation of solar‑powered dewatering for mining operations. Monitor pumps, solar arrays, water levels, and operational efficiency in real time.</div>
          <div className="mt-5 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Solar-First
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <a href="#plan" className="px-6 py-3 rounded-xl bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/30 transition shadow-glow text-sm md:text-base">
              View Project Plan
            </a>
          </div>
        </div>
      </div>

      {/* Live Monitoring - moved to top */}
      <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5 space-y-3 mx-4 md:mx-6">
        <div className="font-medium">Live Monitoring</div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Water Depth</div>
            <div className="text-xl font-semibold">{waterDepth} m</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Active Pumps</div>
            <div className="text-xl font-semibold">{activePumps}/16</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Solar Output</div>
            <div className="text-xl font-semibold">{solarKW} kW</div>
          </div>
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries.slice(-12)} margin={{ left: 8, right: 8, top: 10 }}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Line dataKey="level" stroke="#60a5fa" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Mode + KPIs (moved up) */}
      <div className="px-4 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 rounded-md text-xs border border-amber-300/40 bg-amber-100/40 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">Mode: {mode}</span>
        </div>

        <div className="mt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <NavLink to="/solar" className="block hover:-translate-y-0.5 transition-transform" aria-label="Solar Energy Generated">
            <Card icon={Sun} title="Solar Energy Generated" value={totalSolar.toLocaleString()} suffix=" kWh" />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="Diesel Saved">
            <Card icon={Activity} title="Diesel Saved" value={dieselSaved.toLocaleString()} suffix=" L" />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="Cost Saved">
            <Card icon={Gauge} title="Cost Saved" value={`₹${costSaved.toLocaleString()}`} />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="CO2 Reduced">
            <Card icon={Leaf} title="CO₂ Reduced" value={carbonReduced.toLocaleString()} suffix=" t" />
          </NavLink>
          <NavLink to="/pumps" className="block hover:-translate-y-0.5 transition-transform" aria-label="Water Dewatered">
            <Card icon={Droplets} title="Water Dewatered" value={totalDewatered.toLocaleString()} suffix=" m³" />
          </NavLink>
        </div>
      </div>

      

      
      

      <div className="grid gap-6 grid-cols-1">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium flex items-center gap-2">Solar Power vs Time <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-violet/10 text-neon-violet border border-neon-violet/30">Area</span></div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ left: 8, right: 8, top: 10 }}>
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5ad42" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f5ad42" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip />
                <Area type="monotone" dataKey="solar" stroke="#f5ad42" fill="url(#solarGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2 flex items-center gap-2">Pump Power Consumption <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">Line</span></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line type="monotone" dataKey="pump" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2 flex items-center gap-2">Water Level Trend <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-pink/10 text-neon-pink border border-neon-pink/30">Line</span></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Project plan - moved to bottom */}
      <div id="plan" className="rounded-2xl border border-white/10 bg-gradient-to-br from-neon-violet/10 to-neon-cyan/10 p-5 md:p-6 mx-4 md:mx-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Project Plan</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/10 border border-white/20">Showcase Ready</span>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Objectives</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Reduce diesel usage via solar</li>
              <li>Maximize dewatering efficiency</li>
              <li>Predict water levels and volume</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Architecture</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>PV → Inverter → Pumps</li>
              <li>Ultrasonic depth sensing</li>
              <li>Edge controller & API</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Data Flow</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Sensor → Stream → Store</li>
              <li>ML → Forecast → Control</li>
              <li>Reports → Stakeholders</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Safety</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Overcurrent protection</li>
              <li>Dry-run pump interlocks</li>
              <li>Auto grid fallback</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Solar Contribution</div>
            <div className="mt-1 text-sm">72%</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[72%] bg-neon-cyan" />
            </div>
          </div>
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Diesel Reduction</div>
            <div className="mt-1 text-sm">-58%</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[58%] bg-neon-violet" />
            </div>
          </div>
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Cost Savings Target</div>
            <div className="mt-1 text-sm">₹12.5L / ₹18L</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[69%] bg-amber-400" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {[
            { t: 'Design', s: 100 },
            { t: 'Integration', s: 85 },
            { t: 'ML Tuning', s: 70 },
            { t: 'Reports', s: 90 },
          ].map((m, i) => (
            <div key={i} className="rounded-md p-3 bg-white/70 dark:bg-mining-card border border-white/20">
              <div className="flex items-center justify-between">
                <span>{m.t}</span>
                <span>{m.s}%</span>
              </div>
              <div className="h-1.5 mt-2 rounded bg-white/30 overflow-hidden">
                <div className="h-full" style={{ width: `${m.s}%`, background: 'linear-gradient(90deg,#a78bfa,#22d3ee)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
