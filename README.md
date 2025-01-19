# nwhacks_2025_chit_chart
Chit Chart - People over Paperwork

## Inspiration


The idea was born when one of our developers worked on developing Electronic Medical Record Software at the UBC Pharmacists' clinic and shadowed a healthcare appointment.

We then talked to a number of medical students, pharmacist students, and undergrads working in clinical settings to understand the current documentation situation- pdfs of paragraph and unstructured notes for each visit scanned in the computer and then hours of manual human labour to extract that information into tabular format.

## What it does

Our software removes the time-consuming aspect of documentation by converting audio transcripts and clinician's sticky notes into structured data using Named Entity Recognition (NER).

## Adherence to Regulations and Compliance

Given that our developers come from a healthcare background, we take patient privacy extremely seriously, which includes taking a course on medical software regulation prior to the hackathon on Coursera provided by Yale.

We have made an earnest attempt to adhere to Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and provincial regulations such as the Ontario Personal Health Information Protection Act (PHIPA). 

Firstly we always acted with the least amount of information as possible using data anonymization with database keys: We replaced all healthcare_id and patient names with patient_id to ensure  patient anonymity when managing transactions between our frontend and backend apis.

Additionally, we took inspiration from governmental organizations on storage of sensitive data and decided to architect our backend, model and storage stack to be all run on local servers.

To accomplish this, we undertook three very ambitious tasks.
1) Run llm locally on a gpu ensure that all queries with patient data are not sent to cloud servers. 
2) Host our database locally on our machine server to ensure all patient data are not sent to cloud servers. 
3) Host our backend locally so we can access our local llm and database 
We will explain how we built some of these features in the next section.

## How we built it

### [LLM Training data]
We attempted to fine-tune and train the model with patient anonymized datasets or mock data, adhering to privacy regulations to ensure that no personal health information was used without consent. Any resemblance of any type of name or date or place or anything else of this training data to real world is purely incidental.

The accuracy of these datasets was ensured by a team member who quickly did some data characterization and validated the data, and also confirmation by a Pharmacology and neuroscience undergrad who both did clinical work such as chart(medical pdf) reviews for clinics to confirm accuracy of transcripts.


### [Model]


### [Backend]
We used a python FastAPI backend to facilitate communication between the react UI and both the supabase database and our LLM on a cloud compute server.

We cloned the github code for Supabase and self-hosting with docker a supabase instance to run on our local machine.
This included composing Docker images and then running Supabase realtime server and postgres database within our local computer, complete with authentication and restful APIs that could be accessed via our local ip endpoint. This allowed us to store all user data locally while still ensuring accessibility of our database with the backend.



### [Frontend]
- Registered chit-chart.work domain with godaddy.com
- set up netlify DNS routing and HTTPS verification with porkbun

Features:
Real-time transcription and data extraction
Secure storage and encryption of patient data
User-friendly interface for clinicians and patients
 
 
 

### [Design]
- generated initial component mockup with vercel V0
- designed responsive logos
- animated brand typography, colors, and brand identity
- prototyped in figma
- 
 -


### [CI/CD + Collaboration]
- github 
- netlify autodeploy (simialr to github actions)
- frontend 
config files set up with tailwind
- backend
- docker


## Challenges we ran into
Potential things to mention maybe - docker/supabase/ngrok

### Data Science Challenges: 
We initially tried approaches that were less computationally intensive (less GPU power needed 
in these cases). Due to time constraints, we could not label a dataset manually for our use case, but this shows immense potential. We tried Named Entity Recognition (NER) along with vector embedding but our results showed the need for more manual training. We definitely plan on exploring this more after the hackathon. 

### Server networking challenges:
Frontend: 
DNS rerouting and also static and dynamic paths for assets- images and gradients
Backend 

### Time constraint challenges:
Since we had the grand idea of 
Supabase cloud storage => supabase locallt
llm locally => 

As a temporay measure, our hardworking frontend teams connected to a cloud version of the same llm model and same database server. The only thing left to do is just to switch the connecting ports when ready within the backend. The frontend will never even notice we switched because of how we abstracted our backend infrastructure. 



## What we learned
We’re 


## What's next for Chit Chart
Current Value
Streamlined documentation process
Improved accuracy of structured patient records 
Enhanced patient-clinician interactions
Future Value
Best solutions to patient privacy while utilizing generative AI
Seamless integration with various healthcare platforms
Empowered clinicians with better tools for patient care


