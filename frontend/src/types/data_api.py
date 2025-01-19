from datetime import date
import datetime

clinician = {
   "id": 128907,
   "first_name": 'Kelly',
   "last_name": 'Chan'
}

patient = {
   "id": 24709,
   "healthcare_number": 1424612672,
   "first_name": 'Freddy',
   "last_name": 'Thompson',
   "age": 12, # optional
   "birthdate": date(), # optional
}

encounter = {
   "id": 120712,
   "clinician_id": 128907,
   "patient_id": 24709,
   "transcript": "optional",
   "startdatetime": datetime, # optional
   "enddatetime": datetime, # optional
}


encounter_notes = [
   {
   "encounter_id": 120712,
   "text": "palpitations, no specific precipitatinig factors "
   },
   {
   "encounter_id": 120712,
   "text": "feels faint but did not lose consiousness"
   },
   {
   "encounter_id": 120712,
   "text": "PMH: negative"
   }
]

medication = {
   "id": 120712,
   "patient_id": 24709,
   "medication": "aspirin", 
   "startdate": date(), # optional
   "enddate": date(), # optional
   "duration": "1 year", # optional
   "dose": "2x week, before meals", # optional
}

allergy = {
   "id": 89220,
   "patient_id": 24709,
   "allergy": "aspirin",
   "startdate": date(), # optional
   "enddate": date(), # optional
}

# aka disease
condition = {
   "id": 124098,
   "patient_id": 24709,
   "condition": "Diabetes type II",
   "startdate": date(), # optional
   "enddate": date(), # optional
}

symptoms = [{
   "id": 912,
   "patient_id": 24709,
   "symptom": "stomachache",
   "occurence_pattern": "mornings" # optional
}, {
   "id": 913,
   "patient_id": 24709,
   "symptom": "nausea",
   "occurence_pattern": "after eating sweets" # optional
}
]