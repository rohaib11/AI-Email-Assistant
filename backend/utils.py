import re

def clean_text(text: str) -> str:
    # Remove common signatures and excess whitespace
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"(?i)(regards|thanks|sincerely|best|cheers)[^$]*$", "", text)
    return text.strip()
