
# AI Email Assistant

An AI-powered email assistant built with **FastAPI** for the backend and **React** for the frontend. This application can summarize incoming emails, classify their intent (e.g., complaint, task, inquiry), and generate smart replies based on the email content.

---

## Features

- **Email Summarization**: Condenses the content of long emails into a brief summary.
- **Intent Classification**: Classifies the intent of the email (e.g., task, inquiry, complaint).
- **Reply Generation**: Generates a smart reply based on the email content in different tones (formal, friendly, short).
- **Email History**: Keeps track of previous emails, their summaries, intents, and generated replies for easy reference.

---
## Interface
![image](https://github.com/user-attachments/assets/5f4d2bb4-7c12-4bc7-8fe9-d11a8bf8483a)

---
## Technologies Used

### Backend:
- **FastAPI**: A modern, fast web framework for building APIs with Python.
- **Uvicorn**: ASGI server for FastAPI.
- **spaCy**: Used for NLP tasks like summarization.
- **transformers (GPT-2)**: Used for generating email replies.
- **scikit-learn**: Used for training the intent classification model.

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI design.
- **Axios**: Used to make HTTP requests to the FastAPI backend.

---

## Installation

### Step 1: Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohaib11/AI-Email-Assistant.git
   cd AI-Email-Assistant
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

4. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

5. **Install the backend dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

6. **Download the spaCy model**:
   ```bash
   python -m spacy download en_core_web_sm
   ```

7. **Run the FastAPI backend**:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at [http://localhost:8000](http://localhost:8000).

---

### Step 2: Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```


3. **Start the React development server**:
   ```bash
   npm start
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

### **Backend Endpoints**

The backend exposes the following API endpoints:

- **POST /summarize/**: Summarizes the input email.
  - **Input**: `{ "email_text": "Your email content" }`
  - **Output**: `{ "summary": "The summarized content" }`

- **POST /classify/**: Classifies the intent of the email (e.g., task, inquiry, complaint).
  - **Input**: `{ "email_text": "Your email content" }`
  - **Output**: `{ "intent": "task" }`

- **POST /generate_reply/**: Generates a reply based on the email content and selected tone.
  - **Input**: `{ "email_text": "Your email content", "tone": "formal" }`
  - **Output**: `{ "reply": "Your AI-generated reply" }`

### **Frontend Interface**

- **Email Input**: Paste an email into the text box.
- **Tone Selection**: Choose the tone for the reply (formal, friendly, or short).
- **Analyze**: Click the "Analyze" button to send the email to the backend for summarization, classification, and reply generation.
- **View Results**: See the summarized email, classified intent, and AI-generated reply.
- **History**: Access a history of previously processed emails, their summaries, intents, and replies.

---
## Demo 
![image](https://github.com/user-attachments/assets/ef0877a1-7af7-4800-b996-183aea9f5f63)
---

## File Structure

```
EmailAI/
├── backend/
│   ├── main.py                ← FastAPI app & API routes
│   ├── summarizer.py          ← Email summarization logic
│   ├── intent_classifier.py   ← Intent detection logic
│   ├── reply_generator.py     ← Smart reply generator using GPT-2
│   ├── utils.py               ← Basic text cleaning functions
│   └── requirements.txt       ← Backend dependencies
├── frontend/
│   ├── public/                ← Static assets (HTML, images, etc.)
│   ├── src/                   ← Source code for the React app
│   │   ├── App.js             ← Main React component
│   │   ├── App.css            ← Component-specific styles (optional)
│   │   ├── index.css          ← Global styles (includes Tailwind directives)
│   │   ├── index.js           ← Entry point for the React application
│   │   ├── setupTests.js      ← Jest testing environment setup
│   ├── tailwind.config.js     ← Tailwind CSS configuration
│   ├── postcss.config.js      ← PostCSS configuration for Tailwind
├── .gitignore                 ← Specifies files/folders Git should ignore
├── README.md                  ← Project documentation
└── package.json               ← Frontend dependencies and project configuration
```

---

## Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request with your changes. Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License.
