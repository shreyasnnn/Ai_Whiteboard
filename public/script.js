const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Set canvas size to fit the window
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

let painting = false;
let brushColor = document.getElementById('color-picker').value;
let brushSize = document.getElementById('brush-size').value;
let erasing = false; // Flag for eraser mode

// Start drawing (mouse)
const startPainting = (e) => {
    painting = true;
    draw(e);
};

// Stop drawing (mouse)
const stopPainting = () => {
    painting = false;
    ctx.beginPath();
};

// Draw on the canvas (mouse)
const draw = (e) => {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    // If erasing, set strokeStyle to the canvas background color
    ctx.strokeStyle = erasing ? '#fff' : brushColor;

    // Adjust for canvas offset
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

// Mouse event listeners
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', draw);

// Start drawing (touch)
const startTouch = (e) => {
    painting = true;
    drawTouch(e);
};

// Stop drawing (touch)
const stopTouch = () => {
    painting = false;
    ctx.beginPath();
};

// Draw on the canvas (touch)
const drawTouch = (e) => {
    if (!painting) return;

    // Prevent default behavior to avoid scrolling
    e.preventDefault();

    const touch = e.touches[0];

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    // If erasing, set strokeStyle to the canvas background color
    ctx.strokeStyle = erasing ? '#fff' : brushColor;

    // Adjust for canvas offset
    ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
};

// Touch event listeners
canvas.addEventListener('touchstart', startTouch);
canvas.addEventListener('touchend', stopTouch);
canvas.addEventListener('touchmove', drawTouch);

// Clear button functionality
document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Update brush color
document.getElementById('color-picker').addEventListener('input', (e) => {
    brushColor = e.target.value;
    erasing = false; // Turn off eraser when color is selected
});

// Update brush size
document.getElementById('brush-size').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

// Eraser button functionality
document.getElementById('eraser-btn').addEventListener('click', () => {
    erasing = true; // Enable eraser mode
});

// Save button functionality
const saveButton = document.getElementById('save-btn');
const loader = document.getElementById('loader');
const ans = document.getElementById('ans');

saveButton.addEventListener('click', () => {
    loader.style.display = 'flex';
    saveButton.disabled = true;

    // Create an offscreen canvas to add a white background
    const offscreenCanvas = document.createElement('canvas');
    const ctx = offscreenCanvas.getContext('2d');

    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    ctx.drawImage(canvas, 0, 0);

    const dataURL = offscreenCanvas.toDataURL('image/png');
    const payload = { image: dataURL };

    fetch('/save-drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => {
            loader.style.display = 'none';
            saveButton.disabled = false;
            ans.innerHTML = data.result;
        })
        .catch((error) => {
            console.error('Error saving drawing:', error);
            alert('Failed to save drawing.');
            loader.style.display = 'none';
            saveButton.disabled = false;
        });
});

// File input for uploading images
const fileUploadInput = document.getElementById('file-upload');
fileUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});

// Drag and Drop functionality for images
const dragDropArea = document.getElementById('drag-drop-area');

dragDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropArea.classList.add('drag-over');
});

dragDropArea.addEventListener('dragleave', () => {
    dragDropArea.classList.remove('drag-over');
});

dragDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropArea.classList.remove('drag-over');

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});
