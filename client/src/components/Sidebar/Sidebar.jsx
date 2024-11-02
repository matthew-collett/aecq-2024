import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import SidebarLink from './SidebarLink'

const Sidebar = ({ navRoutes }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)
  const isExpanded = expanded ? 'w-60' : 'w-20'

  return (
    <nav
      className={`${isExpanded} bg-primary text-secondary flex flex-col transition-all duration-300 ease-in-out relative z-50`}
    >
      <Link to="/">
        <div className="flex justify-center items-center w-full h-header bg-primary">
          <img src="../../../public/favicon.svg" alt="Logo" className="h-full" />
          {expanded && <span className="text-2xl font-logo">SeedMap</span>}
        </div>
      </Link>
      <hr className="w-full border-slate-600" />
      <button
        onClick={toggleExpanded}
        className={`absolute top-12 right-[-16px] bg-primary text-secondary rounded-full w-6 h-6 flex items-center justify-center cursor-pointer z-50`}
      >
        <FontAwesomeIcon className="text-xs" icon={expanded ? 'chevron-left' : 'chevron-right'} />
      </button>
      <div className="flex flex-col gap-2 py-3">
        {Object.values(navRoutes).map(route => (
          <SidebarLink
            key={route.label}
            to={route.path}
            icon={route.icon}
            label={route.label}
            active={expanded}
          />
        ))}
      </div>
    </nav>
  )
}

export default Sidebar
