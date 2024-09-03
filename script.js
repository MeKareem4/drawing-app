const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 150;

let drawing = false;
let erasing = false;
let brushSize = 5;
let eraserSize = 20;
let color = '#000000';

const colorPicker = document.getElementById('color-picker');
const brushSizePicker = document.getElementById('brush-size');
const eraserSizePicker = document.getElementById('eraser-size');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear-canvas');
const saveButton = document.getElementById('save-drawing');

colorPicker.addEventListener('change', (e) => color = e.target.value);
brushSizePicker.addEventListener('input', (e) => brushSize = e.target.value);
eraserSizePicker.addEventListener('input', (e) => eraserSize = e.target.value);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

eraserButton.addEventListener('click', () => erasing = !erasing);
clearButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveDrawing);

function startDrawing() {
    drawing = true;
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); 
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = erasing ? eraserSize : brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? '#ffffff' : color;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    const format = prompt("Enter the format to save as (png or jpeg):").toLowerCase();
    if (format !== "png" && format !== "jpeg") {
        alert("Invalid format. Please enter either png or jpeg.");
        return;
    }
    const dataURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `drawing.${format}`;
    link.click();
}
