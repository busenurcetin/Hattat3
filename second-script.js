const randomImageElement = document.getElementById('random-image');
const downloadButton = document.getElementById('download-button');
const editButton = document.getElementById('edit-button');

const queryParams = new URLSearchParams(window.location.search);
const imageParam = queryParams.get('image');
randomImageElement.src = decodeURIComponent(imageParam);
downloadButton.href = imageParam;

downloadButton.addEventListener('click', () => {
  const a = document.createElement('a');
  a.href = imageParam;
  a.download = 'random-image.jpg';
  a.click();
});

editButton.addEventListener('click', () => {
  window.location.href = `edit-page.html?image=${encodeURIComponent(imageParam)}`;
});



const canvas = document.getElementById("nft-canvas");
const context = canvas.getContext("2d");
let drawingColor = "#000000";
let lineWidth = 2;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
function draw(e) {
  if (!isDrawing) return;

  context.strokeStyle = drawingColor;
  context.lineWidth = lineWidth;
  context.lineCap = "round";

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

const colorInput = document.getElementById("color-input");
const lineWidthInput = document.getElementById("line-width-input");

colorInput.addEventListener("change", (e) => {
  drawingColor = e.target.value;
});

lineWidthInput.addEventListener("change", (e) => {
  lineWidth = parseInt(e.target.value);
});
