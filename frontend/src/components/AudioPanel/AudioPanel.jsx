import { useState } from "react";
import { MicrophoneButton } from '../AudioPanel/MicrophoneButton'

export function AudioPanel() {
   const [fulltranscript, setFullTranscript] = useState('');
   const [transcript, setTranscript] = useState('');

   const patient = {
      id: 24709,
      healthcare_number: 1424612672,
      first_name: 'Freddy',
      last_name: 'Thompson',
      birthdate: new Date('2012-01-01')
    }

   const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date)
    }

   const postTranscript = async () => {
      console.log("post Transcript: " + fulltranscript);
      fetch("http://127.0.0.1:8000/create_encounter", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ 'transcript': fulltranscript })
      })
   }

   const handleTranscriptChange = (newTranscript, record = true) => {
      if (record) {
         setTranscript(newTranscript.slice(newTranscript.length - 200));
         setFullTranscript(newTranscript);
      } else {
         // send api
         postTranscript();
         setTranscript(newTranscript.slice(newTranscript.length - 200));
      }
   }

   return (
      <div>
         <div className="flex flex-row">
            <div className="w-1/3 h-[calc(20vw)] bg-white p-4 rounded-lg shadow-md flex flex-col mr-5 mb-5">
               <h2 className="text-lg font-medium mb-2">Patient Information</h2>
               <div className="space-y-2">
                  <p className="text-sm md:text-base">Name: {patient.first_name} {patient.last_name}</p>
                  <p className="text-sm md:text-base">Healthcare #: {patient.healthcare_number}</p>
                  <p className="text-sm md:text-base">Birth Date: {formatDate(patient.birthdate)}</p>
               </div>
            </div>
            <div className=" w-2/3 bg-white p-4 rounded-lg shadow-md flex flex-col mb-5">
               <p>Start your recording</p>
               <MicrophoneButton onTranscriptChange={handleTranscriptChange} />
            </div>
         </div>
         <div className="bg-white p-4 rounded-lg shadow-md mb-5">
            <div className="h-24 rounded overflow-y-auto">
               {transcript || "Transcript will appear here..."}
            </div>
         </div>
      </div>
   );
}