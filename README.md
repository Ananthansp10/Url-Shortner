# 🔗 URL Shortener

A simple and secure **URL Shortener** application built using **Node.js**, **Express.js**, **MongoDB**, and **Next.js**, following **SOLID principles** and using the **Repository pattern**.  
The project allows users to shorten long URLs, manage their URLs, and authenticate securely with **JWT**.

---

## 🚀 Features

- ✂️ **URL Shortening** – Generate short, unique URLs using `nanoid`
- 🔒 **User Authentication** – Secure login and registration with **JWT**
- 👤 **User Management** – Users can manage their created short URLs
- ⚙️ **RESTful APIs** – Clean and structured backend endpoints
- 🧱 **Repository Pattern** – Separation of business logic and data access
- 🧩 **SOLID Principles** – Well-structured and maintainable code
- 🗄️ **MongoDB** – Efficient data storage for users and URLs
- 💻 **Next.js Frontend** – User-friendly interface for shortening and managing URLs

---

## 🧰 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT |
| **Unique ID Generator** | nanoid |
| **Architecture** | Repository Pattern, SOLID Principles |

---

## ⚙️ Installation

Follow the steps below to set up and run the project locally:

### 1️⃣ Clone the repository
```bash
git clone <your-repository-url>

### 2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the root directory and add the following:
PORT=5000
MONGO_URL=<your-mongodb-uri>
ACCESS_TOKEN_SECRET=<your-jwt-secret>
REFRESH_TOKEN_SECRET=<your-jwt-secret>
FRONT_END_URL=http://localhost:3000

4️⃣ Run the backend server

npm run dev     # for development
# or
npm start       # for production

5️⃣ Run the Next.js frontend

cd client
npm install
npm run dev

