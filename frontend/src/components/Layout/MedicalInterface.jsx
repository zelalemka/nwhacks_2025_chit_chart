import { useState } from 'react';
import { AudioPanel } from '../AudioPanel/AudioPanel';
import { StickyNoteBoard } from '../StickyNoteBoard/StickyNoteBoard';
import { TabPanel } from '../TabPanel/TabPanel';

// Mock data (replace with your actual data)
const clinician = {
  id: 128907,
  first_name: 'Kelly',
  last_name: 'Chan'
}

const patient = {
  id: 24709,
  healthcare_number: 1424612672,
  first_name: 'Freddy',
  last_name: 'Thompson',
  age: 12,
  birthdate: new Date('2012-01-01')
}

const initialEncounterNotes = [
  {
    id: '1',
    encounter_id: 120712,
    text: "palpitations, no specific precipitating factors"
  },
  {
    id: '2',
    encounter_id: 120712,
    text: "feels faint but did not lose consciousness"
  },
  {
    id: '3',
    encounter_id: 120712,
    text: "PMH: negative"
  }
]

const medication = {
  id: 120712,
  patient_id: 24709,
  medication: "aspirin",
  startdate: new Date(),
  duration: "1 year",
  dose: "2x week, before meals"
}

const allergy = {
  id: 89220,
  patient_id: 24709,
  allergy: "aspirin",
  startdate: new Date()
}

const condition = {
  id: 124098,
  patient_id: 24709,
  condition: "Diabetes type II",
  startdate: new Date()
}

const symptoms = [
  {
    id: 912,
    patient_id: 24709,
    symptom: "stomachache",
    occurence_pattern: "mornings"
  },
  {
    id: 913,
    patient_id: 24709,
    symptom: "nausea",
    occurence_pattern: "after eating sweets"
  }
]

export function MedicalInterface() {
  const [encounterNotes, setEncounterNotes] = useState(initialEncounterNotes)

  const handleNotesChange = (updatedNotes) => {
    setEncounterNotes(updatedNotes)
    console.log('Notes updated:', updatedNotes)
  }


  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const structuredInfoTabs = [
    {
      id: 'condition',
      label: 'Condition',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">{condition.condition}</h3>
            <p className="text-sm text-gray-600">
              Since: {formatDate(condition.startdate)}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Related Symptoms</h4>
            {symptoms.map(symptom => (
              <div key={symptom.id} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{symptom.symptom}</p>
                {symptom.occurence_pattern && (
                  <p className="text-sm text-gray-600">
                    Pattern: {symptom.occurence_pattern}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'medication',
      label: 'Medication',
      content: (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">{medication.medication}</h3>
          <p className="text-sm text-gray-600">Dose: {medication.dose}</p>
          <p className="text-sm text-gray-600">Duration: {medication.duration}</p>
          <p className="text-sm text-gray-600">
            Started: {formatDate(medication.startdate)}
          </p>
        </div>
      )
    },
    {
      id: 'allergy',
      label: 'Allergy',
      content: (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">{allergy.allergy}</h3>
          <p className="text-sm text-gray-600">
            Since: {formatDate(allergy.startdate)}
          </p>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold">
            Dr. {clinician.first_name} {clinician.last_name}
          </h1>
        </div>

        <AudioPanel />

        {/* Patient Info and Sticky Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-2">Patient Information</h2>
            <div className="space-y-2">
              <p>Name: {patient.first_name} {patient.last_name}</p>
              <p>Healthcare #: {patient.healthcare_number}</p>
              <p>Age: {patient.age}</p>
              <p>Birth Date: {formatDate(patient.birthdate)}</p>
            </div>
          </div>
          <StickyNoteBoard 
            initialNotes={encounterNotes}
            onNoteChange={handleNotesChange}
          />
        </div>

        {/* Structured Info Tabs */}
        <TabPanel tabs={structuredInfoTabs} />
      </div>
    </div>
  )
}

