import { useEffect, useState } from "react";
import { MicrophoneButton } from '../AudioPanel/MicrophoneButton'

export function AudioPanel({postTranscriptRequest}) {
   const [fulltranscript, setFullTranscript] = useState('');
   const [transcript, setTranscript] = useState('');

   

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
      <>
         {/* Recording Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center space-x-4">
            <MicrophoneButton onTranscriptChange={handleTranscriptChange} />
          </div>
          <div className="mt-4 h-24 bg-gray-100 rounded-lg">
            {/* Waveform visualization would go here */}
          </div>
        </div>

        {/* Transcript Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Transcript</h2>
          <div className="h-32 bg-gray-50 rounded p-2 overflow-y-auto">
            {transcript || "Transcript will appear here..."}
          </div>
        </div>
      </>
   );
}