const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#b7f7ed";

class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;

    this.dx = 1 * this.speed; // dx y dy es la direccion
    this.dy = 1 * this.speed;
  }

  draw(context) { //DIBUJA EL CIRCULO
    //Rellena el objeto
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    //Dibuja la línea del objeto
    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    //Dibuja el texto al centro del objeto
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  update(context) { // ES UN METODO QUE PERMITE MOVER EL OBJETO
    this.draw(context);

    //Si el circulo supera el margen derecho entonces se mueve a la izquierda
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    //Si el circulo supera el margen superior entonces se mueve a abajo
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.posX += this.dx; //POSICION DE LA PELOTA 
    this.posY += this.dy;
  }
} 

/* let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width; 
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX; 
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 1);
miCirculo.draw(ctx);

let coordX = document.getElementById("coordX");
let coordY = document.getElementById("coordY");

let updateCircle = function () {
  requestAnimationFrame(updateCircle); //ES UN METODO QUE PERMITE DIBUJAR CONSTANTEMENTE EL ESCENARIO 
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);

updateCircle(); */

const nCircles = 10;
let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomStrokecolor = "rgba(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let ramdomSpeed = Math.random() * 1 + 3;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, 2);
  circles.push(miCirculo);
}

const coordTableBody = document.getElementById('coordTable').querySelector('tbody');

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  
  // Limpiar la tabla antes de agregar las nuevas coordenadas
  coordTableBody.innerHTML = '';

  circles.forEach((circle, index) => {
    circle.update(ctx);

    // Crear una nueva fila para la tabla
    const row = document.createElement('tr');

    // Crear celdas para el objeto, X y Y
    const cellObject = document.createElement('td');
    cellObject.textContent = circle.text;
    cellObject.classList.add('center-text');
    const cellX = document.createElement('td');
    cellX.textContent = Math.round(circle.posX);
    const cellY = document.createElement('td');
    cellY.textContent = Math.round(circle.posY);

    // Agregar las celdas a la fila
    row.appendChild(cellObject);
    row.appendChild(cellX);
    row.appendChild(cellY);

    // Agregar la fila al cuerpo de la tabla
    coordTableBody.appendChild(row);
  });
};

updateCircle();