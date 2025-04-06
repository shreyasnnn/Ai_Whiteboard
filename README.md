# 🧠 AI Whiteboard

An intelligent web-based whiteboard that solves complex mathematical problems, general knowledge questions, and even answers queries from images — instantly.

## 🚀 Live Demo
Coming Soon...

---

## 📌 Project Description

**AI Whiteboard** is an educational tool built for the web. It allows users to:
- Freely write or draw on a digital whiteboard
- Ask questions through text or image uploads
- Get answers instantly using AI (Gemini API integration)
- Solve complex math problems (integration, algebra, etc.)
- Answer general knowledge or conceptual questions
- Use image inputs (handwritten or printed text) with OCR

This tool aims to support students who lack access to advanced calculators or personalized tutors.

---

## 🎯 Aligned Sustainable Development Goals (SDGs)

This project supports the following **United Nations Sustainable Development Goals (SDGs):**

| SDG Goal | How the project aligns |
|----------|------------------------|
| **Goal 4: Quality Education** | Makes education more accessible with AI-driven instant answers. |
| **Goal 9: Industry, Innovation & Infrastructure** | Utilizes AI and OCR to build an innovative learning interface. |
| **Goal 10: Reduced Inequalities** | Helps learners from under-resourced regions get educational support. |

---

## 🛠 Tech Stack

| Part        | Technology Used              |
|-------------|-------------------------------|
| Frontend    | HTML, CSS, JavaScript         |
| Whiteboard  | Canvas API                    |
| OCR         | Tesseract.js                  |
| AI Backend  | Node.js + Express + Gemini API (Google AI) |

---

## ✨ Features

- 🖊️ Draw/write freely on an interactive canvas
- 📷 Upload image-based questions (with OCR support)
- ⌨️ Text input for questions (math or general knowledge)
- ⚡ Instant AI-generated answers (via Gemini API)
- 🔁 Reset canvas or download your drawing

---

## 🖼️ Screenshots

### 🖊️ Drawing on the Whiteboard  
![Drawing](./screenshots/drawing.png)

### 📷 Uploading an Image Question  
![Uploading Image](./screenshots/upload.png)

### 🤖 AI Answer Output  
![Answer Output](./screenshots/answer.png)

> Images reflect real-time interaction with the app.

---

## 🧪 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/shreyasnnn/Ai_Whiteboard.git

# Navigate into the project directory
cd Ai_Whiteboard

# Install backend dependencies
npm install

# Run the server
node index.js
