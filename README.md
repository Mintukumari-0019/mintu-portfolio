# Mintu's Developer Portfolio 🚀 (Full-Stack)

A modern, full-stack personal portfolio website with a **React 18 frontend**, **Node.js/Express backend**, and **SQLite/PostgreSQL database**, containerized with **Docker** and version-controlled with **Git & GitHub**.

---

## 🛠️ Full Tech Stack

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [SQLite](https://www.sqlite.org/) (Zero-setup local SQL) & [PostgreSQL](https://www.postgresql.org/) (via [Sequelize ORM](https://sequelize.org/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Containerization**: [Docker](https://www.docker.com/) & [Nginx](https://nginx.org/)
- **Version Control**: [Git](https://git-scm.com/) & [GitHub](https://github.com/)

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck & database connection status |
| `GET` | `/api/projects` | Fetch all dynamic portfolio projects |
| `POST` | `/api/projects` | Create a new project in the database |
| `POST` | `/api/contact` | Save a contact form message to the database |
| `GET` | `/api/contact` | View all submitted messages (Admin) |

---

## 📦 Running Locally

### 1. Start the Backend Server (Port 5000)
```bash
# From project root
npm run server

# Or with auto-reload during development
npm run server:dev
```
Backend runs at `http://localhost:5000` and automatically connects to SQLite and pre-seeds the portfolio projects table.

### 2. Start the Frontend Client (Port 3000)
In a separate terminal window:
```bash
npm run dev
```
Frontend runs at `http://localhost:3000` and automatically proxies `/api` calls to the Express backend.

---

## 🐳 Running Full-Stack with Docker Compose

Run both the frontend (Nginx) and backend (Express + SQLite volume) with a single command:

```bash
# Build and run all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

- **Frontend**: `http://localhost:8080`
- **Backend API**: `http://localhost:5000/api/health`

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
