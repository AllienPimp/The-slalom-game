class Obstacle {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.element = document.createElement("div");
    this.element.classList.add("obstacle");
    board.appendChild(this.element);
    this._positionObstacle();
  }

  _positionObstacle() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.height = `${this.h}px`;
  }
}

const keyMap = {
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  LEFT: 37,
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const OBSTACLE_WIDTH = 20;

class Player {
  element = document.querySelector(".player");
  x = 0;
  y = 0;
  lives = 3;

  constructor() {
    this._initMovement();
  }

  _initMovement() {
    document.addEventListener("keydown", this._movePlayer.bind(this));
  }

  _movePlayer(event) {
    this._handleMovement(event);
    setTimeout(() => {
      this._checkCollision();
    }, 0);
  }

  _handleMovement(event) {
    switch (event.keyCode) {
      case keyMap.TOP: {
        this.moveTop();
        break;
      }
      case keyMap.RIGHT: {
        this.moveRight();
        break;
      }
      case keyMap.BOTTOM: {
        this.moveBottom();
        break;
      }
      case keyMap.LEFT: {
        this.moveLeft();
        break;
      }
    }
  }

  moveTop() {
    const newY = this.y - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveRight() {
    const newX = this.x + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  moveBottom() {
    const newY = this.y + PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(this.x, newY)) {
      this.y = newY;
      this._updatePosition();
    }
  }

  moveLeft() {
    const newX = this.x - PLAYER_MOVE_STEP;
    if (this._isMoveInBoundaries(newX, this.y)) {
      this.x = newX;
      this._updatePosition();
    }
  }

  _updatePosition() {
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
  _updateLives() {
    this.lives = this.lives - 1;
    if (this.lives < 1) {
      alert("Game over!");
      window.location.reload();
      this.lives = 3;
    } else {
      alert("You lost 1 life");
    }
    document.querySelector(".lives").innerHTML = `Lives: ${this.lives}`;
  }
  _checkCollision() {
    const arrayObstacles = document.querySelectorAll(".obstacle");
    for (let i = 0; i < arrayObstacles.length; i++) {
      if (this._collision(arrayObstacles[i])) {
        this.x = 0;
        this.y = 0;
        this._updatePosition();
        this._updateLives();
      }
    }
  }
  _collision(obstacle) {
    const obstacle_height = parseInt(obstacle.style.height);
    const l1 = this.x;
    const t1 = this.y;
    const r1 = l1 + PLAYER_WIDTH;
    const b1 = t1 + PLAYER_HEIGHT;
    const l2 = parseInt(obstacle.style.left);
    const t2 = parseInt(obstacle.style.top);
    const b2 = t2 + obstacle_height;
    const r2 = l2 + OBSTACLE_WIDTH;
    if (b1 <= t2 || t1 >= b2 || r1 <= l2 || l1 >= r2) return false;
    return true;
  }
  _isMoveInBoundaries(x, y) {
    if (y < 0) {
      return false;
    }

    if (x < 0) {
      return false;
    }

    if (x > MAP_WIDTH - PLAYER_WIDTH) {
      return false;
    }

    if (y > MAP_HEIGHT - PLAYER_HEIGHT) {
      return false;
    }

    return true;
  }
}
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const board = document.querySelector(".board");
const o1 = new Obstacle(
  getRandomInteger(80, 100),
  0,
  getRandomInteger(250, 450)
);
const o2 = new Obstacle(getRandomInteger(140, 220), 200);
const o3 = new Obstacle(
  getRandomInteger(260, 340),
  0,
  getRandomInteger(250, 450)
);
const o4 = new Obstacle(getRandomInteger(380, 460), 200);
const o5 = new Obstacle(
  getRandomInteger(500, 580),
  0,
  getRandomInteger(250, 450)
);
const o6 = new Obstacle(getRandomInteger(620, 700), 200);
const o7 = new Obstacle(
  getRandomInteger(740, 820),
  0,
  getRandomInteger(250, 450)
);
const o8 = new Obstacle(getRandomInteger(860, 960), 200);

const player1 = new Player();
