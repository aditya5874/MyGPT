<div align="center">
  
  <img src="./frontend/src/assets/blacklogo.png" alt="MyGPT Logo" width="100" />

# MyGPT 🤖

A full-stack, MERN-based ChatGPT clone built from scratch.
<br />
This project features a complete chat interface, full user authentication, and robust backend API limiting to prevent abuse.

</div>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

## ✨ Features

- **🔐 Full User Authentication:** Secure signup and login flow using JWT (JSON Web Tokens) and `bcrypt.js` for password hashing.
- **🔒 Protected Routes:** Only authenticated users can access the chat interface.
- **💬 Real-Time Chat Interface:** A sleek, dark-mode UI inspired by ChatGPT, built with React and CSS.
- **🧠 Per-User Chat History:** Chat threads are saved to the database and linked to the specific user who created them.
- **🚫 API Abuse Prevention:**
  - **Permanent Thread Limit:** Users have a _lifetime limit_ on new thread creation (e.g., 3 threads total). Deleting a thread does _not_ refund this count.
  - **Message Limit:** Each thread is limited to a maximum number of messages (e.g., 4 messages).
- **✅ Backend Validation:** Uses `validator.js` to ensure valid email formats on signup.
- **👁️ Modern UX:** Features like a password visibility toggler, dropdown menus that close on outside clicks, and a clean home page.

## 📸 Screenshots

|                             Auth Pages (Login & Signup)                             |                                 Main Chat Application                                 |
| :---------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| <img src=".frontend/screenshots/login.png" alt="Login and Signup Page" width="400"> | <img src=".frontend/screenshots/chat.png" alt="Main Chat App Screenshot" width="400"> |

## 🛠️ Tech Stack

### Frontend

- **React** (with Vite)
- **React Router** (for page navigation)
- **React Context API** (for state management)
- **CSS3** (for all custom styling)

### Backend

- **Node.js**
- **Express.js** (for routing and API)
- **MongoDB** (Database)
- **Mongoose** (Object Data Modeling)
- **JSON Web Tokens (JWT)** (for authentication)
- **bcrypt.js** (for password hashing)
- **validator.js** (for email validation)
- **OpenAI API** (for AI responses)

## 🧭 Get Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- **Node.js** (v18 or later)
- **npm**
- **MongoDB Account** (for your `MONGODB_URI`)
- **OpenAI API Key**

### 1. Clone the Repository

```sh
git clone [https://github.com/YOUR_GITHUB_USERNAME/my-gpt-clone.git](https://github.com/YOUR_GITHUB_USERNAME/my-gpt-clone.git)
cd my-gpt-clone
```

### 2. Backend Setup

```sh
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file in the /backend folder
# (See the "Environment Variables" section below)

# Start the server
npm run dev
```

The backend server will be running on `http://localhost:8080`.

### 3. Frontend Setup

```sh
# From the root, navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the client
npm run dev
```

The frontend app will be running on `http://localhost:5173`.

## 🔑 Environment Variables

You must create a `.env` file in the `/backend` directory with the following variables:

```env
# MongoDB Connection String from Atlas
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

# A long, random, secret string for signing JWTs
JWT_SECRET=YOUR_SUPER_SECRET_KEY

# Your API key from OpenAI
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

## 👤 Author

**Aditya Gupta**

- **GitHub:** [@[YOUR_GITHUB_USERNAME]](https://github.com/YOUR_GITHUB_USERNAME)
- **LinkedIn:** (Add your LinkedIn profile URL here)
