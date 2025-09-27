# Simple Banking Application

A simple banking application built with Java/Spring Boot and React/TypeScript.

---

## Tech Stack

- **Backend**: Java 21, Spring Boot, Maven
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Containerization**: Docker

- **Testing**: JUnit (Backend), Vitest (Frontend)

---

## How to Run

### Using Docker (Recommended)

This is the simplest way to run the application.

1.  Ensure you have Docker Desktop installed and running.
2.  From the project's root directory, run:
    ```bash
    docker-compose up --build
    ```
3.  Open your browser and navigate to `http://localhost:5173`.

### Running Locally

**Prerequisites:**

- Java JDK 21 or newer
- Node.js and npm

**1. Run the Backend:**

- Open the `backend` project in your IDE (like IntelliJ or VS Code).
- Run the `SimplebankingappApplication.java` file.
- The backend will be available at `http://localhost:8080`.

**2. Run the Frontend:**

- Open a new terminal and navigate to the `frontend` directory.
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- The frontend will be available at `http://localhost:5173`.

---

## Running Tests

### Backend Tests

Navigate to the `backend` directory and run the following Maven command:

```bash
mvn test
```

### Frontend Tests

Navigate to the `frontend` directory and run:

```bash
npm test
```
