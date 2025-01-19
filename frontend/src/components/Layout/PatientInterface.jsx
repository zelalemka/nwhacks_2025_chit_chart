import { TabPanel } from '../TabPanel/TabPanel';

const encounters = [
    {
        'id': 61,
        'created_at': '2025-01-19T16:12:46.884733+00:00',
        'startdatetime': '2025-01-19T16:12:46.884733',
        'enddatetime': '2025-01-19T16:12:46.884733',
        'clinician_id': 2,
        'patient_id': 4,
        'audio_transcript': "how to make husband okay Adderall is it medication they've been taking that should definitely raise up all the flags and then I am lactose intolerant and then I nearly fainted an experience",
        'encounter_summary': 'The patient is experiencing symptoms such as palpitations and nearly fainting, and has a history of lactose intolerance, while their husband is taking Adderall which may be a concern.'
    },
    {
        'id': 62,
        'created_at': '2025-01-19T16:53:19.533911+00:00',
        'startdatetime': '2025-01-19T16:53:19.533911',
        'enddatetime': '2025-01-19T16:53:19.533911',
        'clinician_id': 2,
        'patient_id': 4,
        'audio_transcript': 'actually you can use it right now',
        'encounter_summary': 'The patient experienced palpitations and faintness without losing consciousness, with no specific precipitating factors and a negative past medical history.'
    }
];
export function PatientInterface({ structuredData }) {
    return (
        <div className=" bg-cover min-h-screen bg-app-background bg-no-repeat flex flex-row">

            {/* Main Panel */}
            <div className="w-3/4 p-10">

                {/* Client Profile */}
                <div className="p-4 flex flex-col">

                    <h1 className="text-3xl font-semibold ">
                        Welcome Back, Dillon
                    </h1>

                    <div>
                        <h2 className="text-xl font-semibold my-4">Health Record</h2>
                        <TabPanel data={structuredData} />
                    </div>
                </div>


            </div>

            {/* Side Panel */}
            <div className="w-1/4 flex flex-col">
                <div className="bg-white/50 backdrop-filter backdrop-blur-sm flex-grow p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-center my-2">Appointment History</h2>
                </div>
            </div>
        </div>
    )
}