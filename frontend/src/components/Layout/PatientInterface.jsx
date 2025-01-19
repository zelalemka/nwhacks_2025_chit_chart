import { TabPanel } from '../TabPanel/TabPanel';
import logoImage from '../../assets/small_logo.png';

const encounters = [
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
                    <div className="flex flex-row">
                        <img src={logoImage} alt='chit-chart logo' className='w-10 h-7 mt-1 mr-2' ></img>
                        <h1 className="text-3xl font-semibold ">
                            Welcome Back, Dillon
                        </h1>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold my-4">Health Record</h2>
                        <TabPanel data={structuredData} />
                    </div>
                </div>


            </div>

            {/* Side Panel */}
            <div className="w-1/4 flex flex-col">
                <div className="bg-white/50 backdrop-filter backdrop-blur-sm flex-grow p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-center mt-3 mb-4">Appointment History</h2>
                    <div className="space-y-4">
                        {encounters.map((encounter) => (
                            <div
                                key={encounter.id}
                                className="bg-white-50 p-6 mx-2 rounded-lg backdrop-filter backdrop-blur-sm shadow-md bg-opacity-30"
                            >
                                <p className="text-gray-500">
                                    <span className="font-bold">Date:</span>  {new Date(encounter.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-gray-800">
                                    <span className="font-bold">Summary:</span>  {encounter.encounter_summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}