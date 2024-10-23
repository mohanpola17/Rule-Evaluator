# Rule Engine Evaluator Application

This application is a **Rule Engine** system that allows users to create, combine, and evaluate rules based on certain conditions like age, department, salary, and experience. It consists of a **React-based frontend** and a **Node.js backend** that communicates with a **MongoDB** database for storing and processing rules. The application provides real-time feedback and allows rule evaluations with custom conditions, supported by Bootstrap for styling and `react-toastify` for notification handling.

## Table of Contents

- [Features](#features)
- [Design Choices](#design-choices)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Folder Structure](#folder-structure)
  - [Frontend](#frontend-structure)
  - [Backend](#backend-structure)
- [Build Instructions](#build-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)
  - [Create Rule](#create-rule-api)
  - [Evaluate Rule](#evaluate-rule-api)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features

- Define custom rules based on user data (age, department, salary, etc.).
- Evaluate rules in real-time with immediate feedback.
- Notify users of rule validation success/failure using `react-toastify`.
- Extendable to support additional rule attributes and conditions.

---

## Design Choices

### 1. **Frontend (React with Bootstrap)**
   - The frontend leverages **React** for component-based UI, offering high reactivity and state management through hooks.
   - **Bootstrap** is used for styling to ensure a professional, responsive UI with minimal custom CSS.
   - **Toast notifications** are handled by `react-toastify`, allowing users to receive instant feedback on rule evaluations.
   - **RuleEvaluator Component:** Users can input multiple conditions, select attributes such as age and department, and use logical operators for rule creation without manually entering JSON.

### 2. **Backend (Node.js with MongoDB)**
   - **Express.js** powers the API server, managing routes and requests for rule creation and evaluation.
   - **MongoDB** is the choice for database storage, managed via **Mongoose**, which simplifies schema modeling for the rules.
   - **JSEP** is utilized to parse rule strings into an AST (Abstract Syntax Tree) for logical evaluation. This makes the system flexible in handling complex conditions with future extensibility.
   - Business logic is kept modular with separate controllers and utilities for easier maintainability.

### 3. **Real-time Rule Evaluation**
   - The rule evaluation leverages **AST (Abstract Syntax Tree)**, allowing dynamic rule creation and validation without hardcoding.
   - Immediate validation feedback is sent back to the frontend to inform users whether the rules pass or fail.

---

## Tech Stack

### Frontend
- **React** (with hooks)
- **Bootstrap** (for styling)
- **React Toastify** (for notifications)

### Backend
- **Node.js** with **Express.js**
- **MongoDB** (with Mongoose for schema modeling)
- **JSEP** (for rule parsing and AST evaluation)

---

## Dependencies

### Backend
- **Node.js** (v20.16.0)
- **Express.js**
- **Mongoose** (for MongoDB integration)
- **JSEP** (for parsing and evaluating rule conditions)
- **dotenv** (for environment variable management)

### Frontend
- **React** (v18+)
- **Bootstrap** (v5+)
- **React Toastify** (for notifications)
- **Axios** (for API requests)

---

## Folder Structure

### Frontend Structure

```
/frontend
│
├── /public
│   └── index.html        # Base HTML file for React app
│
├── /src
│   ├── /api
│   │   └── ruleApi.js    # API calls to the backend
│   ├── /components
│   │   └── RuleEvaluator.js  # RuleEvaluator component for evaluating rules
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point for the React app
│   └── styles.css        # Custom CSS styles
│
├── .env                  # Environment variables for frontend
└── package.json          # Project dependencies and scripts
```

### Backend Structure

```
/backend
│
├── /controllers
│   └── ruleController.js  # Business logic for handling rule requests
│
├── /models
│   └── Rule.js            # Mongoose model for storing rules
│
├── /routes
│   └── ruleRoutes.js      # API routes for rule evaluation
│
├── /utils
│   └── evaluateAST.js     # Function to evaluate AST (Abstract Syntax Tree)
│
├── app.js                 # Main entry point for the Node.js server
├── .env                   # Environment variables for backend
└── package.json           # Project dependencies and scripts
```

---

## Build Instructions

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohanpola17/Rule-Evaluator.git
   cd backend
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `/backend` directory with the following contents:

   ```
   MONGO_URI="mongodb+srv://mohanpola1703:mohan@cluster0.q7sao.mongodb.net/userDB?retryWrites=true&w=majority&appName=Cluster0"
   PORT=3001
   ```

4. **Start the backend server:**

   ```bash
   node app.js
   ```

   The server will run on `http://localhost:3001`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend app:**

   ```bash
   npm start
   ```

   The React app will run on `http://localhost:3000`.

---

## Running the Application

### Running the Backend

To start the backend server, run:

```bash
node app.js
```

### Running the Frontend

To start the React app, run:

```bash
npm start
```

Navigate to `http://localhost:3000` in your browser to interact with the Rule Engine.

---

## API Documentation

### Create Rule API

- **Endpoint:** `POST /api/rules/create`
- **Description:** Creates a new rule and saves it to the database.
- **Request Body:**
  ```json
  {
    "ruleString": "age > 30 && department == 'IT'"
  }
  ```

- **Response:**
  ```json
  {
    "message": "Rule created",
    "rule": {
      "_id": "60a7c70f7c8e4a0015f7e7e6",
      "ruleString": "age > 30 && department == 'IT'",
      "ast": { ... }  // Parsed AST of the rule
    }
  }
  ```

### Evaluate Rule API

- **Endpoint:** `POST /api/rules/evaluate`
- **Description:** Evaluates a rule against provided user data.
- **Request Body:**
  ```json
  {
    "ast": { ... },  // AST representation of the rule
    "data": {
      "age": 35,
      "department": "IT"
    }
  }
  ```

- **Response:**
  ```json
  {
    "result": true  // or false if the rule fails
  }
  ```

---

## Environment Variables

In both the backend and frontend, you'll need to configure environment variables:

### Backend

- **MONGO_URI:** MongoDB connection string
- **PORT:** The port on which the backend server will run (default: 3001)

### Frontend

- No specific environment variables are required unless necessary.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README file contains comprehensive build instructions, design decisions, and API documentation for running and interacting with your Rule Engine Evaluator application. Feel free to add more details as needed!
