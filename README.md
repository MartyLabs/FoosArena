# 🏆 Tournament Manager

A **Neo-Brutalism** styled **Tournament Management** application built with **Nuxt 3, Express, Prisma, and PostgreSQL**.  
Manage tournaments, teams, and matches dynamically with a **real-time scoring system** and an **interactive football field**.

## 🚀 Features

- **Tournament Management**: Create, view, and delete tournaments.
- **Team Management**: Add, modify, and remove teams within tournaments.
- **Match System**: Auto-generate matches between teams and manage scores.
- **Leaderboard**: Automatically updated rankings based on match results.
- **Neo-Brutalism UI**: A bold, visually striking design for a unique experience.
- **Interactive Match View**: Manage match scores dynamically with **GSAP animations**.
- **API Documentation**: Swagger integration for backend API.
- **End-to-End Testing**: Cypress tests to ensure app reliability.

---

## 🛠️ **Tech Stack**

| Technology        | Description                      |
| ----------------- | -------------------------------- |
| **Nuxt 3**        | Frontend framework for Vue 3     |
| **Express.js**    | Backend framework for API routes |
| **Prisma**        | ORM for PostgreSQL               |
| **PostgreSQL**    | Relational database              |
| **GSAP**          | Animations for a dynamic UI      |
| **Vue 3 + Pinia** | State management                 |
| **TailwindCSS**   | Styling framework                |
| **Swagger**       | API documentation                |
| **Cypress**       | End-to-end testing framework     |

---

## 📥 **Installation & Setup**

### **1️⃣ Prerequisites**

Make sure you have the following installed:

- [Node.js (LTS)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker (Optional)](https://www.docker.com/)

### **2️⃣ Clone the repository**

```bash
git clone https://github.com/your-username/tournament-manager.git
cd tournament-manager
```

### **3️⃣ Install dependencies**

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### **4️⃣ Setup environment variables**

Create a `.env` file inside the `backend/` directory with the following variables:

```plaintext
DATABASE_URL=postgresql://user:password@localhost:5432/tournament_db
PORT=5000
JWT_SECRET=your_secret_key
```

### **5️⃣ Run the application**

#### 🏗 **Start the backend**

```bash
cd backend
npm run dev
```

#### 🎨 **Start the frontend**

```bash
cd frontend
npm run dev
```

The application will be available at **http://localhost:3000**

---

## 🛠️ **API Documentation (Swagger)**

Once the backend is running, the API documentation can be accessed at:

```
http://localhost:5000/api-docs
```

It includes all available endpoints for tournaments, teams, and matches.

---

## 🧪 **Running Tests**

### **End-to-End Testing (Cypress)**

To run the full suite of E2E tests:

```bash
cd frontend
npx cypress open
```

Choose a test from the Cypress UI and run it.

---

## 🏗 **Project Structure**

```
tournament-manager/
│── backend/                  # Express.js API
│   ├── Dockerfile            # Backend Docker configuration
│   ├── index.js              # Main entry point of the backend
│   ├── jest.config.js        # Jest testing configuration
│   ├── package.json          # Backend dependencies
│   ├── prisma/               # Prisma ORM configuration
│   │   ├── migrations/       # Database migrations
│   │   ├── schema.prisma     # Database schema
│   ├── src/                  # Main backend source code
│   │   ├── controllers/      # Logic for handling requests
│   │   │   ├── matchController.js
│   │   │   ├── teamController.js
│   │   │   └── tournamentController.js
│   │   ├── middleware/       # Middleware (e.g., error handling)
│   │   │   └── errorHandler.js
│   │   ├── models/           # Data models
│   │   ├── routes/           # Express.js API routes
│   │   │   ├── matchRoutes.js
│   │   │   ├── teamRoutes.js
│   │   │   └── tournamentRoutes.js
│   │   ├── services/         # Business logic services
│   │   ├── utils/            # Utility functions (e.g., logging)
│   │   │   └── logger.js
│   └── tests/                # Backend tests
│       ├── match.test.js
│       ├── team.test.js
│       └── tournament.test.js
│
│── docker/                   # Docker setup
│   ├── docker-compose.yml    # Docker Compose configuration
│
│── frontend/                 # Nuxt 3 application (Frontend)
│   ├── app.vue               # Root Vue file
│   ├── assets/               # Static assets (CSS, images)
│   │   ├── css/              # Stylesheets
│   │   │   ├── tailwind.css
│   │   │   └── toaster.css
│   ├── components/           # Vue components
│   ├── layouts/              # Nuxt layouts
│   │   └── default.vue
│   ├── nuxt.config.ts        # Nuxt configuration
│   ├── package.json          # Frontend dependencies
│   ├── pages/                # Vue pages (Nuxt routing)
│   │   ├── index.vue
│   │   ├── match/[id].vue
│   │   ├── team/[id].vue
│   │   ├── teams.vue
│   │   ├── tournament/[id]/index.vue
│   │   ├── tournament/[id]/leaderboard.vue
│   │   ├── tournament/[id]/matches.vue
│   ├── plugins/              # Nuxt plugins
│   │   └── toaster.js
│   ├── public/               # Public assets
│   ├── server/               # Server configuration
│   │   └── tsconfig.json
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── utils/                # Utility functions
│   │   └── format.js
│   └── README.md             # Frontend documentation
│
│── README.md                 # Global project documentation
```

---

## 🤝 **Contributing**

Want to contribute? Please follow these steps:

1. **Fork** the repository.
2. **Create** a new branch (`git checkout -b feature-name`).
3. **Commit** your changes (`git commit -m "Add new feature"`).
4. **Push** the branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

## 📜 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
