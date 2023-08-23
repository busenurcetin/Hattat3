const urlParams = new URLSearchParams(window.location.search);
const imageUrl = urlParams.get("image");
const canvas = document.getElementById("nft-canvas");
const context = canvas.getContext("2d");
const image = new Image();
image.src = imageUrl;

// Draw
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;

  context.strokeStyle = "#000000";
  context.lineWidth = 2;
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

function drawUserName(name) {
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.textBaseline = "bottom"; // Yazının alt taban çizgisine hizala
    const textWidth = context.measureText(name).width;
    const x = canvas.width - textWidth - 20; // Sağdan 10px içeriye
    const y = canvas.height - 20; // Alt kenardan 10px içeriye
    context.fillText(name, x, y);
}


canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

const downloadButton = document.getElementById("download-button2");
downloadButton.addEventListener("click", () => {
    const confirmDownload = confirm("Would you like your name to appear on the image?");
    
    if (confirmDownload) {
        const userName = prompt("Please enter your name:");
        // İsimi resmin sağ alt köşesine yazdır
        drawUserName(userName);
    }
    const imageDataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataURL;
    downloadLink.download = "your_nft.png";
    downloadLink.click();
});



// Canvas

let userDrawing = false;
let selectedColor = "#000";

const colorButtons = document.querySelectorAll(".color");
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedColor = button.style.backgroundColor;
  });
});

canvas.addEventListener("mousedown", () => {
  userDrawing = true;
  context.beginPath();
});

canvas.addEventListener("mousemove", (event) => {
  if (!userDrawing) return;

  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;

  context.lineWidth = 5;
  context.lineCap = "round";
  context.strokeStyle = selectedColor;

  context.lineTo(x, y);
  context.stroke();
});

canvas.addEventListener("mouseup", () => {
  userDrawing = false;
  context.closePath();
});


const circleButton = document.getElementById("circle-button");
const rectangleButton = document.getElementById("rectangle-button");
const triangleButton = document.getElementById("triangle-button");

let drawing = false;
let shape = "circle"; 
let currentPath = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

context.lineJoin = "round";
context.lineCap = "round";

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);


circleButton.addEventListener("click", () => setShape("circle"));
rectangleButton.addEventListener("click", () => setShape("rectangle"));
triangleButton.addEventListener("click", () => setShape("triangle"));

function startDrawing(e) {
    drawing = true;
    currentPath = [{ x: e.offsetX, y: e.offsetY }];

}

function draw(e) {
  if (!drawing) return;
  currentPath.push({ x: e.offsetX, y: e.offsetY });
  redrawCanvas();

}

function stopDrawing() {
  if (!drawing) return;
  drawing = false;
  redrawCanvas();
}

function redrawCanvas() {
  for (let i = 0; i < currentPath.length; i++) {
    if (shape === "circle") {
      const radius = Math.sqrt(
        Math.pow(currentPath[i].x - currentPath[0].x, 2) +
        Math.pow(currentPath[i].y - currentPath[0].y, 2)
      );
      context.beginPath();
      context.arc(
        currentPath[0].x,
        currentPath[0].y,
        radius,
        0,
        2 * Math.PI
      );
    } else if (shape === "rectangle") {
      context.beginPath();
      context.rect(
        currentPath[0].x,
        currentPath[0].y,
        currentPath[i].x - currentPath[0].x,
        currentPath[i].y - currentPath[0].y
      );
    }
    context.stroke();
  }
}

function setShape(newShape) {
  shape = newShape;
  currentPath = [];
}



