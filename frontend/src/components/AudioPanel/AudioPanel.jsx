import { useState } from "react";
import { MicrophoneButton } from '../AudioPanel/MicrophoneButton'

export function AudioPanel({ postTranscriptRequest, patient}) {
   const [fulltranscript, setFullTranscript] = useState('');
   const [transcript, setTranscript] = useState('');
   
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
            <div className="w-1/3 h-100  bg-white/50 p-4 rounded-lg backdrop-filter backdrop-blur-sm shadow-md bg-opacity-30 flex flex-col mr-5 mb-5 border-2 border-white">
               <h2 className="text-lg font-semibold mb-2">Patient Information</h2>
               <div className="space-y-2">
                  <p className="text-sm md:text-base">Name: {patient.first_name} {patient.last_name}</p>
                  <p className="text-sm md:text-base">Healthcare #: {patient.healthcare_number}</p>
                  <p className="text-sm md:text-base">Birth Date: {formatDate(patient.birthdate)}</p>
               </div>
            </div>
            <div className=" w-2/3 bg-white/50 p-4 rounded-lg backdrop-filter backdrop-blur-sm shadow-md flex flex-col justify-start mb-5 border-2 border-white">
               <h2 className="text-lg font-semibold mb-2">Start your recording</h2>
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