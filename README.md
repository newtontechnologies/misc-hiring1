# Frontend Candidate Challenge: Job Progress Dashboard

This short assignment is designed to help us understand how you approach frontend architecture, state management, and component design using React (with TypeScript preferred). It is intentionally minimal in visual/UI complexity. The focus is on code quality, not styling or UI/UX design.

---

## Your Task

Create a small one-page React application that connects to a WebSocket server and displays real-time job progress updates. The application should be structured in a way that demonstrates your understanding of React's component architecture, state management, and handling of WebSocket messages.

You will need to connect to a WebSocket server that is already set up and running (documented further below). Your task is to build the frontend that connects to this server and displays job statuses.

## Requirements

1. Your React application should:
   - Connect to the provided WebSocket server.
   - Display a list of jobs with their current status and progress.
   - Update the job statuses in real-time as messages are received from the WebSocket.
2. The job statuses should include:
   - Job ID
   - Job Name
   - Current Status (e.g., "In Progress", "Completed", "Failed")
   - Progress Percentage (0-100%)
3. When a job is completed, it should remain in the list for 5 seconds and then disappear.
4. Use the provided HTML/CSS in the `client` folder as a starting point for your React components.
5. You can modify the HTML/CSS as needed, but the core functionality should remain intact.
6. Ensure the application is built using:
   - React (TypeScript preferred)
   - Functional components and hooks
   - Sensible component structure and state management
7. The application should properly handle situations where the WebSocket messages come in very rapidly (such as 20 messages per second) without causing performance issues.
8. Use any additional libraries or tools you find necessary (e.g., for state management, styling, etc.). However, do not overengineer the solution. If, for example, you feel that using a state management library like Redux or similar is necessary, justify your choice in the README.
9. You do not need to make the application visually appealing or responsive. Focus on the functionality and code quality.
10. You can use AI tools to assist you in writing the code, but the final solution should be your own work. You should be able to explain your code and decisions during the review.

---

## Project Structure

This repo contains a `client/` and `server/` folder:

- The `client` folder contains some basic HTML and CSS files to help you get started with the frontend.
  - `index.html`: The main HTML file.
  - `style.css`: Basic styles for the application.
  - You will need to convert these into React components.
- The `server/` folder contains the code for the WebSocket server. You do not need to modify or run this code. It is provided for your reference.

---

## Submission Instructions

1. **Create a public GitHub repository** with your solution.
2. Include a brief `README.md` explaining:
   - How to run the project
   - Any architectural decisions or trade-offs
3. Send us the link to your repo once you're ready.

---

## Good Luck!

If anything is unclear or you're unsure about a requirement, feel free to make reasonable assumptions and mention them in your README.

We’re looking forward to seeing your solution and how you approach this challenge.

---

## WebSocket Server Documentation

The WebSocket server is hosted on `wss://hiring1.beey.io/ws/jobs&period=1000`. It sends update messages for jobs every `period` milliseconds. The `period` parametr must be between 50 and 5000 ms. If it is missing or invalid, the server will immediately close the connection and return an error message.

Each job has the following JSON structure in the WebSocket messages:

```json
{
  "id": "n4x8e2Zk", // Unique job ID
  "name": "Client Job #1", // Job name
  "progress": 0, // Progress percentage (0-100)
  "status": "pending" // Current status: "pending", "in-progress", or "completed"
}
```

After connecting to the WebSocket, you will receive an initial message with the current job statuses, followed by updates as inividual jobs progress.

The initial message will look like this:

```json
{
  "event": "initial-jobs",
  "payload": [
    // Array of job objects
  ]
}
```

- Contains some number of initial jobs
- Each jobs start with 0% progress and `"pending"` status.

The `job-update` message is sent repeatedly as jobs make progress (according to the `period`).

```json
{
  "event": "job-update",
  "payload": {
    "id": "n4x8e2Zk",
    "progress": 42,
    "status": "in-progress"
  }
}
```

- Each message updates a **single job**.
- Progress increments randomly between **5–15%** per update.
- Jobs stop updating once `progress` reaches 100% (status: `"completed"`).

## ✅ What We’re Looking For

- **Code clarity** and readability
- **Good React component architecture**
- **Efficient state updates**
- **Handling of WebSocket messages**

---
