## tl;dr
Chit Chart is a healthcare documentation solution that automates the conversion of unstructured clinician notes and audio transcripts into structured data using AI and NLP techniques, streamlining the traditionally manual and time-intensive process. Earnestly trying to adhere to Canadian privacy laws (PIPEDA and PHIPA), our solution employs data anonymization and local hosting for optimal security. The project combines LLMs and NER, a Python FastAPI backend, and a React-based frontend connected via ngrok to create an easy-to-use tool for both doctors & patients. Despite challenges in local hosting and time constraints, we successfully implemented real-time transcription, secure data storage, and a user-friendly interface, paving the way for improved patient-clinician interactions and future integration with healthcare platforms.

## Inspiration
One of our developers worked on developing Electronic Medical Record Software at the UBC Pharmacists' clinic and shadowed a healthcare appointment - where they learned that this software has some major issues. 

We talked to medical students, pharmacy students, and undergrads working in clinical settings to understand the current system -- pdfs of paragraphs & unstructured notes for each visit were scanned into the computer. Then there were ***hours*** of manual human labour to extract that information into tabular format. We want doctors to spend those hours with patients, not charts. 

## What it does

Our software removes the time-consuming aspect of documentation by converting audio transcripts and clinician's sticky notes into structured data using Named Entity Recognition (NER), so the physician can spend less time writing and more time connecting with their patient- putting the chat over the chart, hence, Chit Chart

## Impact 

For physicians: Removing the busy work of editing charts allows doctors to spend more time focusing on caring for patients. In the future, our web app could be combined with an existing EMR *like Telus’ PS Suite* to further speed up the process.
For patients: Patients can better understand their health through the conditions summaries & a better relationship with their physician


## Adherence to Regulations and Compliance

Given that our developers come from a healthcare background, we take patient privacy extremely seriously, which includes taking a course on medical software regulation before the hackathon on Coursera provided by Yale.

We have made an earnest attempt to adhere to Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and provincial regulations such as the Ontario Personal Health Information Protection Act (PHIPA). 

Firstly we always acted with the least amount of information possible using data anonymization with database keys: We replaced all healthcare_id and patient names with patient_id to ensure patient anonymity when managing transactions between our frontend and backend APIs.

Additionally, we took inspiration from governmental organizations on the storage of sensitive data and decided to architect our backend, model and storage stack to be all run on local servers.

To accomplish this, we undertook three very ambitious tasks.
1. Run llm locally on a GPU to ensure that all queries with patient data are not sent to cloud servers. 
2. Host our database locally on our machine server to ensure all patient data are not sent to cloud servers. 
3. Host our backend locally so we can access our local llm and database 
We will explain how we built some of these features in the next section.

## How we built it

### [LLM Training data]
We attempted to fine-tune and train the model with patient anonymized datasets or mock data, adhering to privacy regulations to ensure that no personal health information was used without consent. Any resemblance of any type of name, date, place or anything else of this training data to the real world is purely incidental.

The accuracy of these datasets was ensured by a team member who quickly did some data characterization and validated the data, and also confirmed by a Pharmacology and neuroscience undergrad who both did clinical work such as chart(medical pdf) reviews for clinics to confirm the accuracy of transcripts.

### [Model]
For this project, we explored a variety of methods to analyze patient information and settled on an LLM-based approach. We first tried using Named Entity Recognition (NER) through spaCy with vector embedding using sentenceBERT. We realized that this method would require a larger number of manually labelled dataset entries to fine-tune the NLP model for medical data. Due to time constraints, we pivoted to an LLM to process the data, with great results. We used a cloud compute, but ideally running this model locally is best for security. Since the NER approach requires less computational power, it would be worthwhile exploring in the future. Trying each approach was an incredible opportunity for us to understand firsthand the strengths and weaknesses of various natural language processing methods. 

### [Backend]
We used a Python FastAPI backend to facilitate communication between the react UI and both the supabase database and our LLM on a cloud compute server.

We cloned the GitHub code for Supabase and self-hosting with docker a supabase instance to run on our local machine.
This included composing Docker images and then running Supabase real-time server and Postgres database within our local computer, complete with authentication and restful APIs that could be accessed via our local IP endpoint. This allowed us to store all user data locally while still ensuring the accessibility of our database with the backend.

Connected to supabase client in the FASTApi client, as well as created 7 separate APIs for frontend use. Performed read and write operations in FastApi Client on the supabase server, including filtering queries, insertion statements, and update statements.
Within Supabase, worked on Row Level Security policies. 
Tested all endpoints with Postman.

To accomplish the tough task of serving all our databases, LLM and backend locally but still connecting to our front end, we utilized ngrok to act as a wrapper. 

**How We Used ngrok**
- We used ngrok to create an SSH from our local machine to the internet. This allowed our frontend to connect to the local backend and database without any network configuration complexities.
- ngrok would provide us with a public URL to access our local services from anywhere, which facilitated easy testing, debugging and deployment. These URLs were secure and could be regenerated as needed to maintain security.
- We were able to connect our react app to call the ngrok server as an API and hide the details of our specific backend integration.

Features and qualities:
- connected frontend to backend using ngrok 
- real-time data pipeline and processing data extraction with llama3 model
- Secure and private storage of patient data

### [Frontend]
- Registered chit-chart.work domain with godaddy.com
- set up Netlify DNS routing and HTTPS verification with Porkbun
- tailwind, vitejs and react

Features and qualities:
- Real-time transcription and data extraction
- Real-time database connection triggered
- User-friendly interface for clinicians and patients 

### [Design]
- generated initial component mockup with vercel V0
- designed responsive logos
- animated brand typography, colours, and brand identity
- prototyped in Figma

### [CI/CD + Collaboration]
- Github 
- Netlify auto-deploy (similar to GitHub actions) using vite and npm's build commands 
- ngrok server on the backend
- Docker images for self-hosted supabase instance

## Challenges we ran into

### Data Science Challenges: 
We initially tried approaches that were less computationally intensive (less GPU power needed 
in these cases). Due to time constraints, we could not label a dataset manually for our use case, but this shows immense potential. We tried Named Entity Recognition (NER) along with vector embedding but our results showed the need for more manual training. We plan on exploring this more after the hackathon. 

### Server networking challenges:
Frontend: 
DNS rerouting and also static and dynamic paths for assets- images and gradients
Backend:
- using ngrok and figuring out pathing and domain/IP routing for local supabase servers 

### Time constraint challenges:
Since we had the grand and ambitious solution of hosting both our database and llm locally, we split out development into two sections- one with a temporary measure of accessing the cloud version of the same llm model and the same database server.

We were able to successfully implement both the supabase real-time storage (self-hosted locally with Docker) and also run llama3 locally 1650ti Nvidia GPU. 
1. For supabase, due to time constraints we didn't have time to initialize the database schema and figure out pathing and domain/ip routing for local supabase servers 
2. For the local llama LLM, due to VRAM constraints for the LLM model it didn't operate as well as we would want.

In the future, the only two fixes we would have to do are:
1. reroute the FASTApi to use the local supabase URL as the client 
2. get more VRAM to run llama3 locally

Then the only thing left to do is just to switch the connecting ports when ready within the backend. The front-end will never even notice we switched because of how we abstracted our backend infrastructure using the ngrok and FASTApi wrappers!

## What we learned
Did you even read everything we wrote above? We did so many cool things!   

## What's next for Chit Chart
**Current Value**
- Streamlined documentation process
- Improved accuracy of structured patient records 
- Enhanced patient-clinician interactions

**Future Value**
- Best solutions to patient privacy while utilizing generative AI
- Seamless integration with various healthcare platforms
- Empowered clinicians with better tools for patient care