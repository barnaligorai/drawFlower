const fs = require('fs');

class Style {
  constructor() {
    this.style = '';
  }

  addAttribute(atr, value) {
    this.style = `${this.style}${atr}:${value}; `;
  }

  toString() {
    return `style = "${this.style}"`;
  }
}

const randomInt = (num = 256) => {
  return Math.floor(Math.random() * num);
};

const randomShadeOfRed = () => {
  return [255, randomInt(), randomInt()].join(',');
};

const px = (num) => `${num}px`;

class Petal {
  constructor(size, [posX, posY], color, angle = 45) {
    this.size = size;
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
  }

  changeAngle(deg = 30) {
    this.angle += deg;
  }

  toHtml() {
    const style = new Style();
    style.addAttribute('background-color', `rgb(${this.color})`);
    style.addAttribute('height', `${px(this.size)}`);
    style.addAttribute('width', `${px(this.size)}`);
    style.addAttribute('position', 'absolute');
    style.addAttribute('top', `${px(this.posY)}`);
    style.addAttribute('left', `${px(this.posX)}`);
    style.addAttribute('transform', `rotate(${this.angle}deg)`);
    style.addAttribute('transform-origin', 'bottom left');
    return `<div ${style}></div>`;
  }
}

const drawOneColoredPetals = (petal) => {
  const petalHtml = petal.toHtml();
  fs.appendFileSync('./petals.html', petalHtml, 'utf8');
  petal.changeAngle();
};

const drawPetals = (size, pos) => {
  const petal = new Petal(size, pos, randomShadeOfRed(), randomInt(360));
  const intervalId = setInterval(() => drawOneColoredPetals(petal), 400);
  setTimeout(() => clearInterval(intervalId), 5000);
};

const main = () => {
  const head = '<head><meta http-equiv="refresh" content="1"></head>';
  fs.writeFileSync('./petals.html', head, 'utf8');

  let size = 100;
  const posX = 600;
  let posY = 200;

  drawPetals(size, [posX, posY]);
  const intervalId = setInterval(() => {
    drawPetals(size -= 20, [posX, posY += 20]);
  }, 5000);

  setTimeout(() => clearInterval(intervalId), 30000);
};
main();
