import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import json

"""
Requirements: 
azure-ai-inference
"""


endpoint = "https://models.inference.ai.azure.com"
model_name = "Llama-3.3-70B-Instruct"
token = os.environ["GITHUB_TOKEN"] # EXPORT GITHUB PAT



# Query Setup
transcript = """
Confusion and slurred speech.,HX , (primarily obtained from boyfriend): This 31 y/o RHF experienced a ""flu-like illness 6-8 weeks prior to presentation. 3-4 weeks prior to presentation, she was found ""passed out"" in bed, and when awoken appeared confused, and lethargic. She apparently recovered within 24 hours. For two weeks prior to presentation she demonstrated emotional lability, uncharacteristic of her ( outbursts of anger and inappropriate laughter). She left a stove on.,She began slurring her speech 2 days prior to admission. On the day of presentation she developed right facial weakness and began stumbling to the right. She denied any associated headache, nausea, vomiting, fever, chills, neck stiffness or visual change. There was no history of illicit drug/ETOH use or head trauma.,PMH:, Migraine Headache.,FHX: , Unremarkable.,SHX: ,Divorced. Lives with boyfriend. 3 children alive and well. Denied tobacco/illicit drug use. Rarely consumes ETOH.,ROS:, Irregular menses.,EXAM: ,BP118/66. HR83. RR 20. T36.8C.,MS: Alert and oriented to name only. Perseverative thought processes. Utilized only one or two word answers/phrases. Non-fluent. Rarely followed commands. Impaired writing of name.,CN: Flattened right nasolabial fold only.,Motor: Mild weakness in RUE manifested by pronator drift. Other extremities were full strength.,Sensory: withdrew to noxious stimulation in all 4 extremities.,Coordination: difficult to assess.,Station: Right pronator drift.,Gait: unremarkable.,Reflexes: 2/2BUE, 3/3BLE, Plantars were flexor bilaterally.,General Exam: unremarkable.,INITIAL STUDIES:, CBC, GS, UA, PT, PTT, ESR, CRP, EKG were all unremarkable. Outside HCT showed hypodensities in the right putamen, left caudate, and at several subcortical locations (not specified).,COURSE: ,MRI Brian Scan, 2/11/92 revealed an old lacunar infarct in the right basal ganglia, edema within the head of the left caudate nucleus suggesting an acute ischemic event, and arterial enhancement of the left MCA distribution suggesting slow flow. The latter suggested a vasculopathy such as Moya Moya, or fibromuscular dysplasia. HIV, ANA, Anti-cardiolipin Antibody titer, Cardiac enzymes, TFTs, B12, and cholesterol studies were unremarkable.,She underwent a cerebral angiogram on 2/12/92. This revealed an occlusion of the left MCA just distal to its origin. The distal distribution of the left MCA filled on later films through collaterals from the left ACA. There was also an occlusion of the right MCA just distal to the temporal branch. Distal branches of the right MCA filled through collaterals from the right ACA. No other vascular abnormalities were noted. These findings were felt to be atypical but nevertheless suspicious of a large caliber vasculitis such as Moya Moya disease. She was subsequently given this diagnosis. Neuropsychologic testing revealed widespread cognitive dysfunction with particular impairment of language function. She had long latencies responding and understood only simple questions. Affect was blunted and there was distinct lack of concern regarding her condition. She was subsequently discharged home on no medications.,In 9/92 she was admitted for sudden onset right hemiparesis and mental status change. Exam revealed the hemiparesis and in addition she was found to have significant neck lymphadenopathy. OB/GYN exam including cervical biopsy, and abdominal/pelvic CT scanning revealed stage IV squamous cell cancer of the cervix. She died 9/24/92 of cervical cancer."
"""
sticky_notes = ["Note1", "Note2"]
query = """Can you go throught this medical appointment and summarize key points into the following categories in the following format:

Medication: [<medication bullet points>]
Symptoms: [<symptom bullet points>]
Disease: [<disease bullet points>]
Summary: “<Provide a summary here of the transcript>”

Could you provide this as a JSON String? Please include JUST the JSON string in your response.


Transcript:\n
""" + transcript


def send_request():

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

    return response

# Assume this is in JSON 
llm_response_text = send_request().choices[0].message.content 
llm_response_json = {}

try:
    llm_response_json = json.loads(llm_response_text)
except:
    print("Processing Error")

print(llm_response_json)
print(type(llm_response_json))
