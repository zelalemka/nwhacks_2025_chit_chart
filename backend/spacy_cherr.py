# Load a spacy model and chekc if it has ner
import spacy
nlp=spacy.load('en_core_web_sm')

print(nlp.pipe_names)

import spacy
from spacy.tokens import DocBin
from spacy.training.example import Example

# Load spaCy model
nlp = spacy.blank("en")

# Create a DocBin to store the training data
doc_bin = DocBin(attrs=["LEMMA", "ENT_IOB", "ENT_TYPE"])

# Add training examples to the DocBin
for data in training_data:
    doc = nlp.make_doc(data["text"])
    ents = [(data["entities"][0]["start"], data["entities"][0]["end"], data["entities"][0]["label"])]
    example = Example.from_dict(doc, {"entities": ents})
    doc_bin.add(example)

# Save the DocBin to a file
doc_bin.to_disk("./training_data.spacy")

# Load the DocBin back into spaCy
training_data = list(doc_bin.get_docs(nlp.vocab))

# Add the NER pipeline to the model
ner = nlp.add_pipe("ner", last=True)

# Add labels to the NER model
for label in ["medication", "allergy", "medical_condition"]:
    ner.add_label(label)