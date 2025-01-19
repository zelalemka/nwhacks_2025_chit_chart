import { useState } from 'react'

export function TabPanel({ tabs, className = '' }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id)

  return (
    <div className={`bg-white/50 rounded-lg backdrop-filter backdrop-blur-sm shadow-md border-2 border-white ${className}`}>
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 px-4 py-3 text-sm font-semibold
              transition-colors duration-200
              ${activeTab === tab.id
                ? 'text-sky-600 border-b-2 border-sky-600'
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

