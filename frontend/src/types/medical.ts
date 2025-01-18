export interface Clinician {
  id: number
  first_name: string
  last_name: string
}

export interface Patient {
  id: number
  healthcare_number: number
  first_name: string
  last_name: string
  age?: number
  birthdate?: Date
}

export interface Encounter {
  id: number
  clinician_id: number
  patient_id: number
  startdatetime?: Date
  enddatetime?: Date
}

export interface RawEncounter {
  encounter_id: number
  audio_id: number
}

export interface EncounterNote {
  encounter_id: number
  text: string
}

export interface Medication {
  id: number
  patient_id: number
  medication: string
  startdate?: Date
  enddate?: Date
  duration?: string
  dose?: string
}

export interface Allergy {
  id: number
  patient_id: number
  allergy: string
  startdate?: Date
  enddate?: Date
}

export interface Condition {
  id: number
  patient_id: number
  condition: string
  startdate?: Date
  enddate?: Date
}

export interface Symptom {
  id: number
  patient_id: number
  symptom: string
  occurence_pattern?: string
}

