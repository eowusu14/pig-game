'use strict';
//general scores
const scoreEl = document.querySelector(".score")
const current_scoreEl = document.querySelector(".current-score")
const dice = document.querySelector(".dice")
//btns
const roll_btn = document.querySelector(".btn--roll")
const hold_btn = document.querySelector(".btn--hold")
const new_game = document.querySelector(".btn--new")

//player1
const p1_score = document.querySelector("#score--0") 
const p1_current = document.querySelector("#current--0")
const p1_name = document.querySelector("#name--0")
//player2
const p2_score = document.querySelector("#score--1") 
const p2_current = document.querySelector("#current--1")
const p2_name = document.querySelector("#name--1")

//selecting players
const p1 = document.querySelector(".player--0")
const p2 = document.querySelector(".player--1")

// const scores = [0, 0]
// let current_score = 0
// let activePlayer = 0
// let playing = true
let scores, current_score, activePlayer, playing;

const init = function () {
     scores = [0, 0]
     current_score = 0
     activePlayer = 0
     playing = true

    playing = true
    p1.classList.remove('player--winner')
    p2.classList.remove('player--winner')

    p1.classList.add('player--active')
    p2.classList.remove('player--active')
    dice.style.display = "none" 
    
    p1_score.textContent = 0
    p2_score.textContent = 0
    
    p1_current.textContent =  0
    p2_current.textContent =  0

}

init()

//switch player function
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    current_score = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    p1.classList.toggle("player--active")
    p2.classList.toggle("player--active")  
} 

//generating random numbers
//function
const genDiceNum = function() {
    if (playing) {
        
    const randNum = Math.floor(Math.random() * 6 + 1)
    console.log(randNum);
    dice.src = `./dice-${randNum}.png`

     
    dice.style.display = "block"

    //check for rolled dice if true, switch
    if (randNum !== 1) {
       current_score += randNum
       document.getElementById(`current--${activePlayer}`).textContent = current_score
   
    } else {
        switchPlayer()
    }
    }
}; 

p1_score.textContent = 0
p2_score.textContent = 0
dice.style.display = "none" 

roll_btn.addEventListener('click', genDiceNum)


hold_btn.addEventListener("click", function () {
    if (playing) {
    //add current score to active player
    scores[activePlayer] += current_score
    // scores[1] = scores[1] + current_score
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
   
    //check if score is >= to 30
    if (scores[activePlayer] >= 30) {
        //finish game
        playing = false;
        dice.style.display = "none" 
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

    } else {
        //switch player
        switchPlayer()
    }
    }
});

new_game.addEventListener("click", init)