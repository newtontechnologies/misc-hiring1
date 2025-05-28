import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import { nanoid } from 'nanoid';

const PORT = process.env.PORT || 4000; // Default port for the WebSocket server

// --- Configuration ---
const INITIAL_JOB_COUNT_MIN_PER_CLIENT = 3;
const INITIAL_JOB_COUNT_MAX_PER_CLIENT = 7;
const JOB_UPDATE_INTERVAL_MS = 1000;       // How often to check for job progress updates
const JOB_PROGRESS_INCREMENT_MIN = 5;      // Min progress % to add per update
const JOB_PROGRESS_INCREMENT_MAX = 15;     // Max progress % to add per update
const CHANCE_TO_PROGRESS_JOB = 0.7;        // 70% chance a job will progress each update cycle

// --- Store for client-specific jobs ---
// Map: WebSocket client instance => { jobs: Map<jobId, jobData>, jobAdvancementInterval: IntervalID, jobCounter: number }
const clientData = new Map();

// --- Helper Functions ---
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getJobStatus(progress) {
  if (progress <= 0) return "pending";
  if (progress >= 100) return "completed";
  return "in-progress";
}

// --- WebSocket Server Setup ---
const server = http.createServer();
const wss = new WebSocketServer({ server });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Initialize data for this client
  const jobsForClient = new Map();
  let clientJobCounter = 0;
  clientData.set(ws, {
    jobs: jobsForClient,
    jobAdvancementInterval: null, // Will be set shortly
    jobCounter: clientJobCounter,
  });

  // Create initial random jobs for this client
  const numInitialJobs = getRandomInt(INITIAL_JOB_COUNT_MIN_PER_CLIENT, INITIAL_JOB_COUNT_MAX_PER_CLIENT);
  const initialJobsPayload = [];

  for (let i = 0; i < numInitialJobs; i++) {
    clientJobCounter++;
    const jobId = nanoid(8); // Using nanoid with a length of 8
    const newJob = {
      id: jobId,
      name: `Client Job #${clientJobCounter} (ID: ${jobId})`,
      progress: 0,
      status: getJobStatus(0),
    };
    jobsForClient.set(jobId, newJob);
    initialJobsPayload.push(newJob);
  }
  clientData.get(ws).jobCounter = clientJobCounter; // Update the counter in clientData

  // Send initial jobs to the newly connected client
  ws.send(JSON.stringify({
    event: 'initial-jobs', // Kebab-case event name
    payload: initialJobsPayload
  }));
  console.log(`Sent ${initialJobsPayload.length} initial jobs to new client.`);

  // Start job advancement interval for this client
  const intervalId = setInterval(() => advanceClientJobs(ws), JOB_UPDATE_INTERVAL_MS);
  clientData.get(ws).jobAdvancementInterval = intervalId;


  ws.on('message', (message) => {
    console.log(`Received message from client (ignored): ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    const clientInfo = clientData.get(ws);
    if (clientInfo) {
      clearInterval(clientInfo.jobAdvancementInterval); // Stop updates for this client
      clientData.delete(ws); // Remove client's data
      console.log('Cleaned up data for disconnected client.');
    }
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error for a client: ${error.message}`);
    // Consider also cleaning up clientData if the error is fatal for this ws connection
    // For simplicity, we rely on 'close' event for cleanup.
  });
});


// Function to advance jobs for a specific client
function advanceClientJobs(ws) {
  const clientInfo = clientData.get(ws);
  if (!clientInfo || !ws || ws.readyState !== WebSocket.OPEN) {
    // Client might have disconnected or data not found, stop if interval is still somehow running
    if (clientInfo && clientInfo.jobAdvancementInterval) {
        clearInterval(clientInfo.jobAdvancementInterval);
        clientData.delete(ws); // Defensive cleanup
    }
    return;
  }

  const { jobs } = clientInfo;
  let updated = false;

  jobs.forEach(job => {
    if (job.progress < 100) {
      if (Math.random() < CHANCE_TO_PROGRESS_JOB) {
        const increment = getRandomInt(JOB_PROGRESS_INCREMENT_MIN, JOB_PROGRESS_INCREMENT_MAX);
        job.progress = Math.min(100, job.progress + increment);
        job.status = getJobStatus(job.progress);

        // Send update only to this specific client
        ws.send(JSON.stringify({
          event: 'job-update', // Kebab-case event name
          payload: job
        }));
        updated = true;
      }
    }
  });

  if (updated) {
    // console.log(`Advanced jobs for a client.`);
  }
}


// Start the HTTP server
server.listen(PORT, () => {
  console.log(`HTTP server (for WebSocket) listening on port ${PORT}`);
});
