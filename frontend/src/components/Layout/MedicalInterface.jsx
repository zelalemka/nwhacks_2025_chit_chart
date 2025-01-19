import { useState } from 'react';
import { AudioPanel } from '../AudioPanel/AudioPanel';
import { StickyNoteBoard } from '../StickyNoteBoard/StickyNoteBoard';
import { TabPanel } from '../TabPanel/TabPanel';
import logoImage from '../../assets/small_logo.png';

// Mock data 
const clinician = {
  id: 2,
  first_name: 'Kelly',
  last_name: 'Chan'
}

const patient = {
  id: 4,
  healthcare_number: 1424612672,
  first_name: 'Dillon',
  last_name: 'Lee',
  birthdate: new Date('2012-01-01')
}

const initialEncounterNotes = [
  {
    "text": "palpitations, no specific precipitating factors",
    "id": Date.now().toString()
  },
  {
    "text": "faint but did not lose consciousness",
    "id": Date.now().toString() + 1
  },
  {
    "text": "PMH: negative",
    "id": Date.now().toString() + 2
  }
]

const port = 'https://4490-128-189-239-208.ngrok-free.app';

export function MedicalInterface({ structuredData, setStructuredData }) {
  const patient_id = patient['id'];
  const clinician_id = clinician['id'];
  const [encounterNotes, setEncounterNotes] = useState(initialEncounterNotes);

  const postTranscriptRequest = async (fulltranscript) => {
    console.log("post Transcript: " + fulltranscript);
    fetch(`${port}/create_encounter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        'transcript': fulltranscript,
        'patient_id': patient_id,
        'clinician_id': clinician_id,
        'notes': encounterNotes.map((x) => x['text'])
      })
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw `error with status ${response.status}`;
      }
    }).then((data) => {
      console.log(data);
      const newStructuredData = {
        "conditions": structuredData.conditions.concat(data['processed']['Disease'].map((x) => {return {"condition": x};})),
        'symptoms': structuredData.symptoms.concat(data['processed']['Symptoms'].map((x) => {return {"symptom": x};})),
        "medications": structuredData.medications.concat(data['processed']['Medication'].map((x) => {return {"medication": x};}))
      };      
      setStructuredData(newStructuredData);
    }
    ).catch((exception) => {
      console.log(exception);
    });
  }

  const handleNotesChange = (updatedNotes) => {
    setEncounterNotes(updatedNotes)
  }
  return (
    <div className=" bg-cover min-h-screen bg-app-background bg-no-repeat flex flex-row">

      {/* Main Panel */}
      <div className="w-3/4 p-10">

        {/* Physician Profile */}
        <div className="p-4 flex flex-row">
          <img src={logoImage} alt='chit-chart logo' className='w-10 h-7 mt-1 mr-2' ></img>
          <h1 className="text-3xl font-semibold ">
            Welcome Back, Doctor
          </h1>
        </div>

        <AudioPanel postTranscriptRequest={postTranscriptRequest} patient={patient} />

        <TabPanel data={structuredData} />
      </div>

      {/* Side Panel */}
      <div className="w-1/4 flex flex-col">
        <div className="bg-white/50 backdrop-filter backdrop-blur-sm flex-grow p-4 rounded-lg shadow-md">
          <StickyNoteBoard
            initialNotes={encounterNotes}
            onNoteChange={handleNotesChange}
          />
        </div>
      </div>
    </div>
  )
}

