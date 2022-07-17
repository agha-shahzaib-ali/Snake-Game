// Game Constants & Variables:
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Game functions:
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.dir(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //if you bump onto yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Part-1: Updating the Snake Array & Food.
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    food = { x: 6, y: 7 };
    // musicSound.play();
    score = 0;
    let Final_Score=document.getElementById('score-board');
    Final_Score.innerHTML = `Score: ${score}`;
  }

  //if you have eaten the food, increment the score and regenerate the food.
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodSound.play();
    score +=1;
  
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      HiScoreBox.innerHTML=`HiScore: ${hiscoreval}`;
    }
    let Final_Score=document.getElementById('score-board');
    Final_Score.innerHTML = `Score: ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    // adds a snake body segment at the start of the SnakeArr or the Snake Body at the Display in UI.
    // Grid varies between 0-18 in both x and y directions, but to avoid food item appearing at the boundary of the grid x and y are varied between 2-16.
    let a = 2, b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part-2: Display the Snake and Food. (As an HTML Element)
  //Display the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } 
    else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Logic starts here
  musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
  hiscoreval=0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
  hiscoreval=JSON.parse(hiscore);
  HiScoreBox.innerHTML=`Hi Score: ${hiscoreval}`;
}


window.requestAnimationFrame(main);
// addEventListener("event", function(){});
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      // console.dir("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      // console.dir("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      // console.dir("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      // console.dir("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "Spacebar":
      console.dir("paused");
      alert("Pause");
      break;
    default: 
      break;
  }
});
