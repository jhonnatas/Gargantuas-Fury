const ranger = document.querySelector('.ranger');
const background = document.querySelector('.background1');
const main_song = "audio/Hans-Zimmer-No-Time-for-Caution.mp3";

let isJumping = false;
let isGameOver = false;
let position = 0;
let countAsteroids = 0;
let audio = new Audio(main_song);
//Time counter
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function modalShow () {
  $("#myModal").modal('show');
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function gameStart(){
  audio_play(); 
  createAsteroid();
  document.addEventListener('keyup', handleKeyUp);
}

function audio_play() {
  audio.play();  
}

function audio_stop() {
  audio.pause();
  audio.currentTime = 0;
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          ranger.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      ranger.style.bottom = position + 'px';
    }
  }, 20);
}

function createAsteroid() {
  const asteroid = document.createElement('div');
  //let asteroidPosition = 1000;
  let asteroidPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  asteroid.classList.add('asteroid');
  background.appendChild(asteroid);
  asteroid.style.left = asteroidPosition + 'px';

  let leftTimer = setInterval(() => {
   
    if (asteroidPosition < -60) {
      // Saiu da tela
      countAsteroids ++; //Counts the number of jumped asteroids
      document.getElementById("points").innerHTML = "Asteroides x " + countAsteroids; 
         
      clearInterval(leftTimer);
      background.removeChild(asteroid);
    } else if (asteroidPosition > 0 && asteroidPosition < 80  && position < 80) {
      // Game over      
      clearInterval(leftTimer);
      isGameOver = true;
      audio_stop();
      document.body.innerHTML = `<div class="game-over"><h1>Game Over - Pontos: ${countAsteroids}</h1><h4>"Não adentre a boa noite apenas com ternura , não entre nessa noite acolhedora com ternura .
      Pois a velhice queima ao cair do dia , fúria fúria contra luz que o esplendor já não fulgura." -  Dylan Thomas</h4><img src="images/cooper-game-over.gif" alt="game over"></div>`;
    } else {
      asteroidPosition -= 10;
      asteroid.style.left = asteroidPosition + 'px';
    }
  }, 15);
  setTimeout(createAsteroid, randomTime);
}

function changeBg(){
  const images = [
    'url("images/gargantua.jpg")' 
  ];

  const div = document.getElementById("gargan");
  const bg = images[Math.floor(Math.random() * images.length)];
  div.style.backgroundImage = bg;
}

setInterval(changeBg, 120000);

//Time counter
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

//createAsteroid();
//document.addEventListener('keyup', handleKeyUp);





