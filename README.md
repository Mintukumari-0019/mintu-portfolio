# Mintu's Developer Portfolio 🚀

A modern, responsive personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Fully containerized with Docker and ready for deployment.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Containerization**: [Docker](https://www.docker.com/) & [Nginx](https://nginx.org/)
- **Version Control**: [Git](https://git-scm.com/) & [GitHub](https://github.com/)

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/myportfolio_mintu.git

# Navigate to project directory
cd myportfolio_mintu

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🐳 Running with Docker

Run the entire application in an isolated, production-optimized container using Docker and Nginx.

### Using Docker Compose (Recommended)
```bash
# Build and run container in detached mode
docker-compose up -d --build

# View container logs
docker-compose logs -f

# Stop container
docker-compose down
```

Visit `http://localhost:8080` in your browser.

### Using Plain Docker Commands
```bash
# Build the Docker image
docker build -t mintu-portfolio:latest .

# Run the container mapping host port 8080 to container port 80
docker run -d -p 8080:80 --name mintu-portfolio mintu-portfolio:latest
```

---

## 🔧 Project Scripts

- `npm run dev` - Starts the local Vite development server at port 3000
- `npm run build` - Builds production bundle inside `dist/` directory
- `npm run preview` - Previews the production build locally

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
