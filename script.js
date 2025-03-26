// Get the canvas and its context
const canvas = document.getElementById("pendulumCanvas");
const ctx = canvas.getContext("2d");

// Declare variables for pendulum simulation
let angle, angularVelocity, angularAcceleration;
let gravity = 9.81; // Acceleration due to gravity
let length, mass, ballColor;
let animationFrameId;
let isRunning = false;
let timeStep = 0.02; // Slowing down the simulation

// Function to initialize the pendulum variables
function initializePendulum() {
    angle = Math.PI / 4; // Initial angle of the pendulum
    angularVelocity = 0;
    angularAcceleration = 0;
    length = parseFloat(document.getElementById("length").value) * 100; // Convert to pixels
    mass = 1;
    ballColor = document.getElementById("color").value;
}

// Function to draw a background grid on the canvas
function drawGrid() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Function to draw the pendulum
function drawPendulum() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawGrid(); // Draw the background grid

    // Calculate pendulum positions
    let originX = canvas.width / 2;
    let originY = 0;
    let ballX = originX + length * Math.sin(angle);
    let ballY = originY + length * Math.cos(angle);

    // Draw pendulum rod
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(ballX, ballY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pendulum ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
}

// Function to update the pendulum motion using physics
function updatePendulum() {
    let force = -gravity / length * Math.sin(angle);
    angularAcceleration = force;
    angularVelocity += angularAcceleration * timeStep; // Slow down simulation
    angle += angularVelocity * timeStep;
    angularVelocity *= 0.99; // Apply damping effect

    drawPendulum();
    animationFrameId = requestAnimationFrame(updatePendulum);
}

// Function to start the simulation
function startSimulation() {
    if (isRunning) {
        cancelAnimationFrame(animationFrameId); // Stop any ongoing animation
    }
    isRunning = true;
    initializePendulum();
    updatePendulum();
}

// Function to update the pendulum length in real-time
function updateLength() {
    length = parseFloat(document.getElementById("length").value) * 100; // Convert to pixels
    document.getElementById("lengthValue").textContent = document.getElementById("length").value; // Update displayed length
    drawPendulum(); // Update pendulum immediately for instant feedback
}

// Event listener for real-time length updates
document.getElementById("length").addEventListener("input", updateLength);

// Initialize and draw the pendulum for the first time
initializePendulum();
drawPendulum();
