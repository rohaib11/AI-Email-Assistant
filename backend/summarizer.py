from transformers import pipeline

summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small")

def summarize_email(email_text: str) -> str:
    input_text = "summarize: " + email_text.strip().replace("\n", " ")[:1000]
    result = summarizer(input_text, max_length=60, min_length=20, do_sample=False)
    return result[0]["summary_text"]
