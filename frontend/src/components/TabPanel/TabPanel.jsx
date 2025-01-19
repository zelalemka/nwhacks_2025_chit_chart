import { useState } from 'react';

const formatDateString = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export function TabPanel({data, className = '' }) {
  const tabs = [
    {
      id: 'condition',
      label: 'Conditions',
      content: (
        <div className="space-y-4">
          {data.conditions.map((condition, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
              <h3 className="font-medium">{condition.condition}</h3>
              {condition.startdate && (
                <p className="text-sm text-gray-600">
                  Since: {formatDateString(condition.startdate)}
                </p>
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'symptom',
      label: 'Symptoms',
      content: (
        <div className="space-y-4">
          {data.symptoms.map(symptom => (
            <div key={symptom.id} className="p-3 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
              <p className="font-medium">{symptom.symptom}</p>
              {symptom.occurence_pattern && (
                <p className="text-sm text-gray-600">
                  Pattern: {symptom.occurence_pattern}
                </p>
              )}
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'medication',
      label: 'Medications',
      content: (
        <div className="space-y-4">
          {data.medications.map((medication, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
              <h3 className="font-medium">{medication.medication}</h3>
              {medication.dose && (<p className="text-sm text-gray-600">Dose: {medication.dose}</p>)}
              {medication.duration && (<p className="text-sm text-gray-600">Duration: {medication.duration}</p>)}
              {medication.startdate && (
                <p className="text-sm text-gray-600">
                  Started: {formatDateString(medication.startdate)}
                </p>
              )}
            </div>
          ))}
        </div>
      )
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className={`bg-white-50 rounded-lg backdrop-filter backdrop-blur-sm shadow-md border-2 border-white ${className}`}>
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium
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
  );
}
