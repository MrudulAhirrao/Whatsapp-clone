# WhatsApp Clone 🚀

This project is a full-stack clone of the WhatsApp Web interface, built with Next.js and Node.js. It is designed to simulate real-time chat conversations by processing and displaying chat data from simulated webhook payloads, featuring a responsive UI and a backend API to manage conversations and messages.

##  Live Demo Links

* **Frontend Application:** **[https://whatsapp-clone-frontend-ud4o.onrender.com/](https://whatsapp-clone-frontend-ud4o.onrender.com/)**
* **Backend API:** **[https://whatsapp-clone-backend-d9wf.onrender.com/](https://whatsapp-clone-backend-d9wf.onrender.com/)**

*(Note: The free-tier services on Render may "spin down" after a period of inactivity. The first load might take 30-60 seconds to wake the servers up.)*

---

## 📸 Screenshot



---

## ✨ Features

* **Full-Stack Architecture:** Monorepo structure with a Node.js/Express.js backend and a Next.js/React frontend.
* **Dynamic Data:** Fetches and displays conversation lists and message histories from the live backend API.
* **Interactive Chat:** Users can select a chat to view the conversation and send new messages, which are saved to the database.
* **Data Seeding:** Includes a script to process and populate the MongoDB database from sample JSON data payloads.
* **Live Simulation:** Features client-side simulations for receiving new chats and replies to create a more dynamic and engaging user experience.
* **Responsive UI:** A multi-column, responsive layout inspired by the WhatsApp desktop application, built with Tailwind CSS and shadcn/ui.

---

## 🛠️ Tech Stack

* **Frontend:**
    * [Next.js](https://nextjs.org/)
    * [React](https://reactjs.org/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [shadcn/ui](https://ui.shadcn.com/)
* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
* **Database:**
    * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* **Deployment:**
    * [Render](https://render.com/)

---

## 📋 API Endpoints

The backend server provides the following RESTful API endpoints:

| Method | Endpoint                       | Description                                |
| :----- | :----------------------------- | :----------------------------------------- |
| `GET`  | `/api/conversations`           | Fetches a list of all unique conversations.|
| `GET`  | `/api/messages/:conversationId`| Fetches the full message history for a chat.|
| `POST` | `/api/messages`                | Creates and saves a new outgoing message.  |

---

## ⚙️ Setup and Local Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MrudulAhirrao/whatsapp-clone.git]
    cd whatsapp-clone
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory: `cd apps/backend`
    * Create a `.env` file and add your MongoDB connection string:
        ```env
        MONGO_URI=your_mongodb_connection_string
        ```
    * Install dependencies: `npm install`
    * Populate the database with the sample data: `node populateDb.js`

3.  **Setup the Frontend:**
    * Navigate to the frontend directory: `cd apps/frontend`
    * Create a `.env.local` file to point to your local backend server:
        ```env
        http://localhost:8000
        ```
    * Install dependencies: `npm install`

4.  **Run Both Servers:**
    * In one terminal, start the backend server (from `apps/backend`):
        ```bash
        npm start
        ```
    * In a second terminal, start the frontend server (from `apps/frontend`):
        ```bash
        npm run dev
        ```
    * Open `http://localhost:3000` in your browser.

---

## 🚀 Deployment

The application is deployed on **Render** using a two-service monorepo setup.

* The **backend** is a Node.js Web Service pointing to the `apps/backend` root directory. It uses the `MONGO_URI` environment variable.
* The **frontend** is a Node.js Web Service pointing to the `apps/frontend` root directory. It connects to the live backend via the `NEXT_PUBLIC_API_URL` environment variable.
