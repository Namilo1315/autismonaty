const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let color = 'black';
let lineWidth = 2;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clearCanvas(); // Limpiar al redimensionar
}

function getEventPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e; // Obtener la posición del toque o del mouse
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
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
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
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
canvas.addEventListener('mouseout', stopDrawing);

// Eventos táctiles
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});
canvas.addEventListener('touchend', stopDrawing);

// Ajustar canvas al cargar la página
window.addEventListener('load', resizeCanvas);
// Ajustar canvas al redimensionar la ventana
window.addEventListener('resize', resizeCanvas);

