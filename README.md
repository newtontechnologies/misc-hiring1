# Frontend Candidate Challenge: Job Progress Dashboard

This short assignment is designed to help us understand how you approach frontend architecture, state management, and component design using React (with TypeScript preferred). It is intentionally minimal in visual/UI complexity. The focus is on code quality, not styling or UI/UX design.

---

## Your Task

Create a small React application that connects to a WebSocket server and displays real-time job progress updates. The application should be structured in a way that demonstrates your understanding of React's component architecture, state management, and handling of WebSocket messages.

### WebSocket Server

There is a WebSocket server that provides real-time updates about various jobs. You will **not** need to run or modify this server; it is already set up and running at `wss://hiring1.beey.io/ws/jobs`. It will periodically send progress updates for various jobs once you connect to it.

### Steps to Complete

1. Build a React application that:
   - Connects to the provided WebSocket server.
   - Displays a list of jobs with their current status and progress.
   - Updates the job statuses in real-time as messages are received from the WebSocket.
2. Use the provided HTML/CSS in the `client` folder as a starting point for your React components.
3. You can modify the HTML/CSS as needed, but the core functionality should remain intact. 
4. Ensure the application is built using:
   - React (TypeScript preferred)
   - Functional components and hooks
   - Sensible component structure and state management
5. Use any additional libraries or tools you find necessary (e.g., for state management, styling, etc.). However, do not overengineer the solution. If, for example, you feel that using a state management library like Redux or similar is necessary, justify your choice in the README.

---

## Project Structure

This repo contains a `client/` and `server/` folder:

- The `client` folder contains some basic HTML and CSS files to help you get started with the frontend.
  - `index.html`: The main HTML file.
  - `style.css`: Basic styles for the application.
  - You will need to convert these into React components.
- The `server/` folder contains the code for the WebSocket server. You do not need to modify or run this code. It is provided for your reference.

---

## ✅ What We’re Looking For

- **Code clarity** and readability
- **Good React component architecture**
- **Efficient state updates**
- **Handling of WebSocket messages**

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
