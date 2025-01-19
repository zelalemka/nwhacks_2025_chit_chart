import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import json



endpoint = "https://models.inference.ai.azure.com"
model_name = "Llama-3.3-70B-Instruct"
token = os.environ["GITHUB_TOKEN"] # EXPORT GITHUB PAT


# Query Setup
transcript = """
Hi Dillon. I see from the nurses’ file that you have had episodes of heart palpitations for a few months now. 
Um, maybe it happens once or twice a month. I originally thought it was because I was stressed from exams and stuff, but then during a basketball game two days ago, I felt lightheaded and couldn’t breath and my heart was pounding for about 10 minutes. I thought I was going to faint but I didn’t.
 That sounds concerning. Does it usually happen during physical activity? 
No, sometimes when I’m resting. Any other symptoms during these episodes, like sweating or shortness of breath?
 “How long does the pounding usually last, and do you feel pain at all?”
“3 to 4 minutes? It doesn’t hurt though.”
 I see. You also wrote in this form that you’ve been taking Adderall twice a week?”
Yeah my roommate gave it to me as a study aid..
 It's important to avoid taking medications that aren't prescribed to you. We'll look into a safe and effective way to address your symptoms.”
 Thank you for sharing that. Do you smoke or drink?
I don’t smoke, but I  have 3-4 drinks during parties on the weekends. 
Sounds good, any other substances, like marijuana?”
I tried marijuana once recently. Nothing else.
"""
sticky_notes = ['Heart palpitations approximately once or twice a month' , 'Non-painful', 'Takes Adderall as a study aid', 'Social drinking' , 'Tried marijuana once, no substances', 'might have asthma']



def send_llm_request(transcript, sticky_notes):

    endpoint = "https://models.inference.ai.azure.com"
    model_name = "Llama-3.3-70B-Instruct"
    token = os.environ["GITHUB_TOKEN"] # EXPORT GITHUB PAT

    query = """Can you go throught this medical appointment transcript along with the various sticky notes and summarize key points together into the following categories in the following format:

    Medication: [<medication bullet points>]
    Symptoms: [<symptom bullet points>]
    Disease: [<disease bullet points>]
    Summary: “<Provide a summary here of the transcript>”

    Could you provide this as a JSON String? Please include JUST the JSON string in your response.


    Could you provide this as a JSON String? Please include JUST the JSON string in your response.


    Transcript:\n
    """ + transcript

    Transcript:\n
    """ + transcript + '\nSticky  Notes: \n' + "\n".join(sticky_notes)

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

    # Assume this is in JSON 
    llm_response_text = response.choices[0].message.content 
    llm_response_json = {}

    try:
        llm_response_json = json.loads(llm_response_text)
    except:
        print("Processing Error")

    return llm_response_json



llm_response_json = send_llm_request(transcript, sticky_notes)

print(llm_response_json)
print(type(llm_response_json))
