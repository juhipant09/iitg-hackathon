import { Outlet, NavLink } from 'react-router-dom'
import { Sun, Moon, Activity, Droplets, BatteryCharging, Gauge, Cpu, Home, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

function AppLayout() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-full transition border whitespace-nowrap ${isActive ? 'border-neon-violet/40 bg-white/80 dark:bg-white/10 text-neon-cyan shadow-glow' : 'border-transparent hover:bg-white/70 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200'}`

  return (
    <div className="min-h-screen bg-white dark:bg-mining-bg">
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <BatteryCharging className="text-neon-cyan" />
            <span className="font-semibold tracking-tight">SolarSiphon</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClasses} end>
              <Home size={16} /> Dashboard
            </NavLink>
            <NavLink to="/pumps" className={linkClasses}>
              <Droplets size={16} /> Pumps
            </NavLink>
            <NavLink to="/solar" className={linkClasses}>
              <Sun size={16} /> Solar
            </NavLink>
            <NavLink to="/ml" className={linkClasses}>
              <Cpu size={16} /> ML
            </NavLink>
            <NavLink to="/reports" className={linkClasses}>
              <Gauge size={16} /> Reports
            </NavLink>
            <NavLink to="/health" className={linkClasses}>
              <Activity size={16} /> Health
            </NavLink>
            <NavLink to="/optimizer" className={linkClasses}>
              <BatteryCharging size={16} /> Optimizer
            </NavLink>
            <NavLink to="/team" className={linkClasses}>
              <Users size={16} /> Our Team
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(v => !v)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
        <div className="md:hidden overflow-x-auto no-scrollbar px-4 pb-3">
          <div className="flex items-center gap-2 w-max">
            <NavLink to="/" className={linkClasses} end>
              <Home size={16} /> Dashboard
            </NavLink>
            <NavLink to="/pumps" className={linkClasses}>
              <Droplets size={16} /> Pumps
            </NavLink>
            <NavLink to="/solar" className={linkClasses}>
              <Sun size={16} /> Solar
            </NavLink>
            <NavLink to="/ml" className={linkClasses}>
              <Cpu size={16} /> ML
            </NavLink>
            <NavLink to="/reports" className={linkClasses}>
              <Gauge size={16} /> Reports
            </NavLink>
            <NavLink to="/health" className={linkClasses}>
              <Activity size={16} /> Health
            </NavLink>
            <NavLink to="/optimizer" className={linkClasses}>
              <BatteryCharging size={16} /> Optimizer
            </NavLink>
            <NavLink to="/team" className={linkClasses}>
              <Users size={16} /> Our Team
            </NavLink>
          </div>
        </div>
      </header>
      <main className="pt-2">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
