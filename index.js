const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
  constructor({ position, velocity, color = "red"}) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    }
    this.color = color;
    this.isAttacking;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //attack box
    c.fillStyle = "blue";
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'green',
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

function animate() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  player.update();
  enemy.update();

  //player 1 movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  //player 2 movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //detecting collisions
  if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x
      && player.attackBox.position.x <= enemy.position.x + enemy.width
      && player.attackBox.position.y + player.attackBox.height >= enemy.position.y
      && player.attackBox.position.y <= enemy.position.y + enemy.height
      &&  player.isAttacking
    ){
    console.log("collide");
  }
}

animate();

window.addEventListener("keydown", () => {
  switch (event.key) {

    //enemy
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;

    //enemy  
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
  }
});

window.addEventListener("keyup", () => {
  switch (event.key) {
    //player 1 keys
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
    case "w":
      keys.w.pressed = false;
    //player 2 keys
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
  }
});
