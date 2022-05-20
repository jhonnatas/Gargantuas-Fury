const ranger = document.querySelector('.ranger');
const background = document.querySelector('.background1');
const home_song = "audio/X2Download.com - [No Copyright Sound] Space [Hybrid] [ FREE USE MUSIC ] - Keys of Moon Music - Voice of Eternity (128 kbps).ogg";
const main_song = "audio/Hans-Zimmer-No-Time-for-Caution.ogg";

let isJumping = false;
let isGameOver = false;
let position = 0;
let countAsteroids = 0;
let home_audio = new Audio(home_song);
let audio = new Audio(main_song);

//Time counter
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;


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
  home_audio_stop();
  audio_play();
  setInterval(setTime, 1000); 
  createAsteroid();
  document.addEventListener('keyup', handleKeyUp);
}

function audio_play() {
  audio.play();
  audio.loop = true; 
}

function home_audio_play() {
  home_audio.play();
  home_audio.loop = true;
}

function audio_stop() {
  audio.pause();
  audio.currentTime = 0;
}

function home_audio_stop() {
  home_audio.pause();
  home_audio.currentTime = 0;
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
      document.body.innerHTML = `<div class="game-over"><h3 class="display-6">Game Over - <span class="badge bg-secondary">Pontos: ${countAsteroids}</span></h1>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p>Não adentre a boa noite apenas com ternura, não entre nessa noite acolhedora com ternura. Pois a velhice queima ao cair do dia, 
          fúria fúria contra luz que o esplendor já não fulgura.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="Source Title">Dylan Thomas</cite>
        </figcaption>
      </figure>      
     </div>`;

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





