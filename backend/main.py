import os
from supabase import create_client, Client
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import json

# TODO RUN ONCE
os.environ['SUPABASE_URL'] = 'https://mhsatlgwdnlnvbacmcue.supabase.co'
os.environ['SUPABASE_KEY'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2F0bGd3ZG5sbnZiYWNtY3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjY4NzYsImV4cCI6MjA1MjgwMjg3Nn0.XMnJ-YD7x2-j1TQjejSZKA9ppr9T2SJ6R_fHlNrPn-Q'

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

endpoint = "https://models.inference.ai.azure.com"
model_name = "Llama-3.3-70B-Instruct"
token = os.environ["GITHUB_TOKEN"] # EXPORT GITHUB PAT


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173/",
    "localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_patient_facing_ai_summary(type: str,term: str):

    endpoint = "https://models.inference.ai.azure.com"
    model_name = "Llama-3.3-70B-Instruct"
    token = os.environ["GITHUB_TOKEN"] # EXPORT GITHUB PAT

    query = f"""
    Given a type of term from the following categories - Medication, Symptoms, Disease and a term could you describe the term in about 20 words? 

    Term: {term}
    Type of Term: {type}

    Provide ONLY the term description in your response
    """

    print(query)

    client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(token),
    )

    response = client.complete(
        messages=[
            SystemMessage(content="You are a helpful assistant."),
            UserMessage(content=query),
        ],
        temperature=1.0,
        top_p=1.0,
        max_tokens=1000,
        model=model_name
    )

    llm_response_text = response.choices[0].message.content 
    return llm_response_text

def send_llm_request(transcript, sticky_notes):
    query = """Can you go through this medical appointment transcript along with the various sticky notes and summarize key points together into the following categories in the following format:

    Medication: [<medication bullet points>]
    Symptoms: [<symptom bullet points>]
    Disease: [<disease bullet points>]
    Summary: “<Provide a summary here of the transcript>”

    Could you provide this as a JSON String? Please include JUST the JSON string in your response.


    Transcript:\n

    """ + transcript + '\nSticky  Notes: \n' + "\n".join(sticky_notes)

    client = ChatCompletionsClient(
        endpoint=endpoint,
        credential=AzureKeyCredential(token),
    )

    response = client.complete(
        messages=[
            SystemMessage(content="You are a helpful assistant."),
            UserMessage(content=query),
        ],
        temperature=1.0,
        top_p=1.0,
        max_tokens=1000,
        model=model_name
    )

    # Assume this is in JSON 
    llm_response_text = response.choices[0].message.content 
    llm_response_json = {}

    try:
        llm_response_json = json.loads(llm_response_text)
    except:
        print("Processing Error")

    return llm_response_json




@app.get("/")
def read_root():
    return {"Charity Says": "Hello World"}

@app.get("/clinicians")
def read_clinicians():
   response = supabase.table("clinician").select("*").execute()
   return {"data": response.data}

@app.get("/explain/{type}/{term}")
def read_clinicians(type: str, term: str):
   llm_response = get_patient_facing_ai_summary(type, term)
   response = {"explained": llm_response}
   print(response)
   return response

@app.get("/encounters/{patient_id}")
def read_clinicians(patient_id: int):
   response = supabase.table("encounter").select("*").eq("patient_id", patient_id).execute()
   return {"data": response.data}

# note disable RLS in supabase to get permissions to write and read
@app.get("/patient/{name}")
def insert_patient(name: str):
    firstname, last_name = name.split("_")
    response = (
    supabase.table("patient")
    .insert({"first_name": firstname, "last_name": last_name})
    .execute()
   )

    return {"response": response}


class Encounter(BaseModel):
    clinician_id: int
    patient_id: int
    transcript: str
    notes: List[str]


@app.post("/create_encounter")
async def create_encounter(data: Encounter):
    encounter = {'clinician_id': data.clinician_id, 'patient_id': data.patient_id, 'audio_transcript': data.transcript}
    response = (
    supabase.table("encounter")
    .insert(encounter)
    .execute()
   )
    encounter_id = response.data[0]['id']
    e_notes = []
    for note in data.notes:
        e_note = {'text': note, 'encounter_id': encounter_id}
        e_notes.append(e_note)
        response = (
        supabase.table("encounter_notes")
        .insert(e_note)
        .execute())

    processed_llm_outputs = send_llm_request(data.transcript, data.notes)
    try:
        if processed_llm_outputs['Summary']:
            response = (
            supabase.table("encounter")
            .update({"encounter_summary": processed_llm_outputs['Summary']})
            .eq("id", encounter_id)
            .execute())
    except Exception as e:
        print("SUPABASE UPDATE ERROR:", e)
    
    ans = {'encounter_response': response.data, 'notes_response': e_notes, "processed": processed_llm_outputs, "transcript": data.transcript}
    print(ans)
    return ans

# class Item(BaseModel):
#     name: str
#     description: str | None = None
#     price: float
#     tax: float | None = None

# @app.get("/audio")
# def get_audio():
#     response = supa.storage.from_('audio_transcripts').download('times_by_tenth.mp3')
#     return {"a": response}

# > fastapi dev main.py