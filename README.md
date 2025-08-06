Here's a clean and structured **README.md** for your full-stack Notes & Bookmarks project:

---
## Demo Video :- <a>https://drive.google.com/file/d/1Kmi1ESoU1XQbTH91hAkimRmM5jqC3TIE/view?usp=drive_link</a>
```markdown
# 📝 Notes & Bookmarks Web App

A full-stack MERN application that allows users to **create**, **update**, and **organize notes and bookmarks**, categorized by tags. Includes authentication, protected routes, and a modern dashboard UI.

---

## 🔧 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth + Cookies
- Clean architecture (Controller, Service, Repository layers)

### Frontend

- React.js
- React Router
- Context API (for Auth)
- Axios (with global instance)
- React Toastify (for notifications)

---

```
## 📁 Folder Structure
<pre lang="markdown">

backend/
├── config/ 
├── controller/
├── middleware/
├── model/
├── repository/
├── routes/
├── services/
├── utils/
└── index.js

frontend/
├── public/
├── src/
├── api/
├── components/
├── context/
├── pages/
├── routes/
├── styles/
├── App.jsx
└── main.jsx

</pre>

````



---

## 🔐 Features

- ✅ User Registration & Login (JWT + cookies)
- ✅ Protected Routes
- ✅ Create, Update, Delete Notes
- ✅ Create, Update, Delete Bookmarks
- ✅ Auto-fetch title from bookmark URL
- ✅ Tag-based filtering for both
- ✅ Toast notifications

---

## 🚀 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/notes-bookmarks-app.git
cd notes-bookmarks-app
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

> Create `.env` file inside `backend/`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/NoteProject
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Then run:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔍 API Endpoints (short list)

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/note/`
- `GET /api/note/`
- `POST /api/bookmark/`
- `GET /api/bookmark/`

---

## 📌 Note

- MongoDB must be running (can use Docker or local installation)
- Cookies are used for storing JWT securely
- Use `.env` file for configuration

---

## 💡 Future Improvements

- Add user profile settings
- Tag management system
- Dark mode UI
- Search functionality

---

## 📃 License

MIT © 2025 Tushar Shitole

```

---

Let me know if you want me to generate this README.md as a downloadable file.
```
