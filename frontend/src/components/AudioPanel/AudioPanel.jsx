import { useState } from "react";
import { MicrophoneButton } from '../AudioPanel/MicrophoneButton'

export function AudioPanel({ postTranscriptRequest }) {
   const [fulltranscript, setFullTranscript] = useState('');
   const [transcript, setTranscript] = useState('');

   const patient = {
      id: 4,
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

   const handleTranscriptChange = (newTranscript, record = true) => {
      if (record) {
         setTranscript(newTranscript.slice(newTranscript.length - 200));
         setFullTranscript(newTranscript);
      } else {
         // send api
         postTranscriptRequest(fulltranscript);
         setTranscript(newTranscript.slice(newTranscript.length - 200));
      }
   }

   return (
      <div>
         <div className="flex flex-row">
            <div className="w-1/3 h-[calc(20vw)]  bg-white/50 p-4 rounded-lg backdrop-filter backdrop-blur-sm shadow-md bg-opacity-30 flex flex-col mr-5 mb-5 border-2 border-white">
               <h2 className="text-lg font-medium mb-2">Patient Information</h2>
               <div className="space-y-2">
                  <p className="text-sm md:text-base">Name: {patient.first_name} {patient.last_name}</p>
                  <p className="text-sm md:text-base">Healthcare #: {patient.healthcare_number}</p>
                  <p className="text-sm md:text-base">Birth Date: {formatDate(patient.birthdate)}</p>
               </div>
            </div>
            <div className=" w-2/3 bg-white/50 p-4 rounded-lg backdrop-filter backdrop-blur-sm shadow-md flex flex-col mb-5 border-2 border-white">
               <p>Start your recording</p>
               <MicrophoneButton onTranscriptChange={handleTranscriptChange} />
            </div>
         </div>
         <div className="bg-white/50 p-4 rounded-lg backdrop-filter backdrop-blur-sm shadow-md mb-5 border-2 border-white">
            <div className="h-24 rounded overflow-y-auto">
               {transcript || "Transcript will appear here..."}
            </div>
         </div>
      </div>
   );
}