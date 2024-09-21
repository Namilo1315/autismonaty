const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let color = 'black';
let lineWidth = 2; // Definimos el grosor inicial del trazo

// Ajustar para dispositivos táctiles
function getEventPosition(e) {
    if (e.touches) { // Si es evento táctil
        return {
            x: e.touches[0].clientX - canvas.getBoundingClientRect().left,
            y: e.touches[0].clientY - canvas.getBoundingClientRect().top
        };
    } else { // Si es evento de mouse
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }
}

// Comenzar a dibujar (mouse y táctil)
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getEventPosition(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Continuar dibujando (mouse y táctil)
function draw(e) {
    if (!isDrawing) return;
    const { x, y } = getEventPosition(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';  // Suavizar las uniones de líneas
    ctx.lineCap = 'round';   // Extremos suaves de líneas
    ctx.stroke();
}

// Terminar de dibujar (mouse y táctil)
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// Selección de color
function setColor(newColor) {
    color = newColor;
}

// Borrador
function setEraser() {
    color = 'white'; // O el color del fondo
}

// Guardar dibujo
function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'dibujo.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Limpiar el canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Cambiar el grosor del trazo
function setLineWidth(width) {
    lineWidth = width;
}

// Eventos de mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing); // Por si el mouse sale del canvas

// Eventos táctiles
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evitar el comportamiento de scroll
    startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Evitar el comportamiento de scroll
    draw(e);
});
canvas.addEventListener('touchend', stopDrawing);
