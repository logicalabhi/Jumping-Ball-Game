score = 0;
cross = true;
audio = new Audio('run.mp3');
audioGo = new Audio('fail.wav');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    ball = document.querySelector(".ball");
    ball.classList.add("animateBall");
    setTimeout(() => {
      ball.classList.remove("animateBall");
    }, 1100);
  } else if (e.keyCode == 39) {
    ball = document.querySelector(".ball");
    ballX = parseInt(
      window.getComputedStyle(ball, null).getPropertyValue("left")
    );
    ball.style.left = ballX + 80 + "px";
  } else if (e.keyCode == 37) {
    ball = document.querySelector(".ball");
    ballX = parseInt(
      window.getComputedStyle(ball, null).getPropertyValue("left")
    );
    ball.style.left = ballX - 80 + "px";
  }
};

setInterval(() => {
  ball = document.querySelector(".ball");
  gameOver = document.querySelector(".gameOver");
  dragon = document.querySelector(".dragon");

  bx = parseInt(window.getComputedStyle(ball, null).getPropertyValue("left"));
  by = parseInt(window.getComputedStyle(ball, null).getPropertyValue("top"));

  dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("top"));

  offsetX = Math.abs(bx - dx);
  offsetY = Math.abs(by - dy);

  //   console.log(offsetX, offsetY);

  if (offsetX < 113 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - Reload to Play Again";
    dragon.classList.remove("animateDrag");
    audioGo.play();
    setTimeout(() => {
        audioGo.pause()
        audio.pause()
    }, 1000);
  } 
  
  else if (offsetX < 80 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      animDur = parseFloat(
        window
          .getComputedStyle(dragon, null)
          .getPropertyValue("animation-duration")
      );
      newDur = animDur - 0.05;
      dragon.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCount.innerHTML = "Your Score: " + score;
}
