from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from pydantic import BaseModel
from summarizer import summarize_email
from intent_classifier import classify_intent
from reply_generator import generate_reply
from utils import clean_text

app = FastAPI(title="AI Email Assistant")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class EmailInput(BaseModel):
    email_text: str
    tone: str = "formal"  # formal, friendly, short

@app.post("/summarize/")
def summarize(payload: EmailInput):
    text = clean_text(payload.email_text)
    if len(text) < 20:
        return {"summary": "Email too short to summarize."}
    return {"summary": summarize_email(text)}

@app.post("/classify/")
def classify(payload: EmailInput):
    text = clean_text(payload.email_text)
    return {"intent": classify_intent(text)}

@app.post("/generate_reply/")
def reply(payload: EmailInput):
    text = clean_text(payload.email_text)
    return {"reply": generate_reply(text, tone=payload.tone)}