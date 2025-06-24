from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")

def generate_reply(email_text: str, tone: str = "formal") -> str:
    prompt_style = {
        "formal": "Write a formal reply to this email:",
        "friendly": "Reply in a friendly and warm tone:",
        "short": "Give a short and to-the-point response:",
    }

    base_prompt = prompt_style.get(tone.lower(), prompt_style["formal"])
    prompt = f"{base_prompt}\n\nEmail: {email_text}\n\nReply:"

    result = generator(prompt, max_length=150, num_return_sequences=1, temperature=0.7)[0]["generated_text"]

    return result.split("Reply:")[-1].strip()
