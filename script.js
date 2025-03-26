const canvas = document.getElementById("pendulumCanvas");
const ctx = canvas.getContext("2d");
const lengthSlider = document.getElementById("length");
const lengthValueDisplay = document.getElementById("lengthValue");

let angle, angularVelocity, angularAcceleration;
let gravity = 9.81;
let length, mass, ballColor;
let animationFrameId;
let isRunning = false;

lengthSlider.addEventListener("input", () => {
    length = parseFloat(lengthSlider.value) * 100;
    lengthValueDisplay.textContent = lengthSlider.value;
    drawPendulum();
});

function initializePendulum() {
    angle = Math.PI / 4; 
    angularVelocity = 0;
    angularAcceleration = 0;
    length = parseFloat(lengthSlider.value) * 100;
    mass = 1;
    ballColor = document.getElementById("color").value;
}

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

function drawPendulum() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    let originX = canvas.width / 2;
    let originY = 0;
    let ballX = originX + length * Math.sin(angle);
    let ballY = originY + length * Math.cos(angle);
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(ballX, ballY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
}

function updatePendulum() {
    let force = -gravity / length * Math.sin(angle);
    angularAcceleration = force;
    angularVelocity += angularAcceleration;
    angle += angularVelocity;
    angularVelocity *= 0.98; // Increase damping to slow down simulation
    drawPendulum();
    animationFrameId = requestAnimationFrame(updatePendulum);
}

function startSimulation() {
    if (isRunning) {
        cancelAnimationFrame(animationFrameId);
    }
    isRunning = true;
    initializePendulum();
    updatePendulum();
}

initializePendulum();
drawPendulum();
