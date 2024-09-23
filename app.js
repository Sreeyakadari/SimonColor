let btns = ["yellow", "red", "purple", "green"];
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;

let h3 = document.querySelector("h3");
let divs = document.querySelectorAll(".btn");

// Step-1
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

// Step-2
function gameFlash(btn) {
  // when btnFlash is called the background color should change to white
  btn.classList.add("flash");
  //   removes flash after 1sec
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  // when btnFlash is called the background color should change to white
  btn.classList.add("userflash");
  //   removes flash after 1sec
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  // userSeq will be null as the user should enter from the beginning
  userSeq = [];
  level++;
  if (level > highScore) {
    highScore = level;
  }
  h3.innerText = `Level ${level}`;

  //   random btn
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // when a random color is generated we should add in game seq
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    // console.log("same value");
    // case-1 in the middle -> wait for another button to press

    // case-2 end of the seq
    if (userSeq.length == gameSeq.length) {
      // delaying the time of levelup as we are not able to track the color is it is displayed very fast
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over!<br> Your score was <b>${
      level - 1
    }<b> Your highest score was <b>${
      highScore - 1
    }</b> <br>Press any key to start.`;
    let body = document.querySelector("body");
    body.style.background = "red";
    setTimeout(function () {
      body.style.background = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  // console.log(this);
  // this will return which button is pressed
  let btn = this;
  // if user clicks a button then it should flash
  userFlash(btn);
  // get the id(color) which is pressed by user
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  // to know the level of user in seq we should send userSeg.length-1
  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  userSeq = [];
  gameSeq = [];
  started = false;
  level = 0;
}
