/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


// Swal.fire('Any fool can use a computer');



// $(window).on('load',function(){
//   $('#myModal').modal('show');
// });

var scores, roundScore, activePlayer, gamePlaying;
debugger;

gameInit();

document.querySelector('.btn-roll').addEventListener('click', function () {

  if (gamePlaying) {

    var audio = new Audio('sound.wav');
    audio.play();

    var dice = Math.floor(Math.random() * 6 + 1);
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM.style.display = 'block';

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.confetti-'+activePlayer).style.visibility = 'visible';     
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', gameInit);

function gameInit() {
  callSweetMsg();
  function callSweetMsg(){
    swal({
    title: "Game Rules",
    text: `
    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as he/she whishes. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
    - The player can choose to 'Hold', which means that his ROUND score gets added to his Total score. After that, it's the next player's turn
    - The first player to reach 50 points on Total score wins the game`,
    type: "success",
    confirmButtonText: "I'm in"
   });
}
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.confetti-0').style.visibility = 'hidden';     
  document.querySelector('.confetti-1').style.visibility = 'hidden';     
  gamePlaying = true;
}

function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';

}
