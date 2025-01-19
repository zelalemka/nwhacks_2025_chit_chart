import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formatDateString = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

const port = 'https://4490-128-189-239-208.ngrok-free.app';

export function TabPanelPatient({ data, className = '' }) {
    const [definition, setDefinition] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getDefineRequest = (term, type) => {
        setIsLoading(true);
        fetch(`${port}/explain/${type}/${term}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: {}
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        }).then((data) => {
            console.log(data);
            setDefinition(data.explained);
            setIsPopupOpen(true);
            setIsLoading(false);
        }).catch((exception) => {
            console.log(exception);
        });
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const tabs = [
        {
            id: 'condition',
            label: 'Conditions',
            content: (
                <div className="space-y-4">
                    {data.conditions.map((condition, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-row justify-between">
                            <div>
                                <h3 className="font-medium">{condition.condition}</h3>
                                {condition.startdate && (
                                    <p className="text-sm text-gray-600">
                                        Since: {formatDateString(condition.startdate)}
                                    </p>
                                )}
                            </div>
                            <button onClick={() =>
                                getDefineRequest(condition.condition, 'Condition')
                            }
                            >?</button>
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
                        <div key={symptom.id} className="p-3 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-row justify-between">
                            <div>
                                <p className="font-medium">{symptom.symptom}</p>
                                {symptom.occurence_pattern && (
                                    <p className="text-sm text-gray-600">
                                        Pattern: {symptom.occurence_pattern}
                                    </p>
                                )}
                            </div>
                            <button onClick={() =>
                                getDefineRequest(symptom.symptom, 'Symptoms')
                            }>
                                ?
                            </button>
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
                        <div key={i} className="p-4 bg-gray-50 rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-row justify-between">
                            <div>
                                <h3 className="font-medium">{medication.medication}</h3>
                                {medication.dose && (<p className="text-sm text-gray-600">Dose: {medication.dose}</p>)}
                                {medication.duration && (<p className="text-sm text-gray-600">Duration: {medication.duration}</p>)}
                                {medication.startdate && (
                                    <p className="text-sm text-gray-600">
                                        Started: {formatDateString(medication.startdate)}
                                    </p>
                                )}
                            </div>
                            <button onClick={() =>
                                getDefineRequest(medication.medication, 'Medications')
                            }
                            >?</button>
                        </div>
                    ))}
                </div>
            )
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    return (
        <div className={`bg-white-50 rounded-lg backdrop-filter backdrop-blur-sm shadow-md border-2 border-white ${className}`}>
            <div className="bg-white/50 flex border-b">
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

            {/* Popup to display definition */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full flex flex-row justify-center align-center">
                        <Loader2 className="w-12 h-12 animate-spin" />
                    </div>
                </div>
            )}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl mb-1 font-semibold">Definition</h3>
                        <p>{definition}</p>
                        <button onClick={closePopup} className="mt-4 bg-red-500 text-white px-2 py-1 rounded-lg">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
