import os
from supabase import create_client, Client
from fastapi import FastAPI

os.environ['SUPABASE_URL'] = 'https://kbunoygknhuzlucepxhn.supabase.co'
os.environ['SUPABASE_KEY'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidW5veWdrbmh1emx1Y2VweGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNzgwMDgsImV4cCI6MjA1Mjc1NDAwOH0._HuRewlM9tOH-qMtL2FYeXepwDHYs8-4dYWsH4dVfcg'

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supa: Client = create_client(url, key)

# print("CONFIRIMING SUPABASE WORKS")
# response = supa.table("clinician").select("*").execute()
# print(response)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "q": "SUP SUP"}



@app.get("/clinicians")
def read_item(item_id: int):
   response = supa.table("clinician").select("*").execute()
   print(response)
   return {"a": response}


# note disable RLS in supabase to get permissions to write and read
@app.get("/patient/{name}")
def insert_patient(name: str):
    firstname, last_name = name.split("_")
    response = (
    supa.table("patient")
    .insert({"first_name": firstname, "last_name": last_name})
    .execute()
   )

    return {"a": response}

@app.get("/audio")
def get_audio():
    response = supa.storage.from_('audio_transcripts').download('times_by_tenth.mp3')
    return {"a": response}

# > fastapi dev supabase_setup.py