//Reel Class
class Reel {
    constructor (numSymbols) {
        this.symbolArray = ["CHERRY", "CHERRY", "CHERRY", "CHERRY", 
                            "CHERRY", "CHERRY", "CHERRY", "ORANGE", 
                            "CHERRY", "CHERRY", "CHERRY", "ORANGE", 
                            "CHERRY", "CHERRY", "CHERRY", "ORANGE", 
                            "CHERRY", "CHERRY", "CHERRY", "ORANGE", 
                            "ORANGE", "ORANGE", "ORANGE", "LEMON", 
                            "LEMON" , "LEMON", "PEAR", "PEAR"];
        }
    pickSymbol() {
        return this.symbolArray[getRandomInt(this.symbolArray.length)];
    }
}


//Main Game Config
const cost = 10;
const deposit = 100;

const winLines = [
    ["CHERRY", "CHERRY","CHERRY",2.5],
    ["ORANGE", "ORANGE","ORANGE",10.0],
    ["LEMON", "LEMON", "LEMON", 20.0],
    ["PEAR", "PEAR","PEAR",50.0]
  ];




//Main Game Variables
let balance=0;
let winnings=0;
let prizeFactor=0;

//Create Reels
const reelOne = new Reel();
const reelTwo = new Reel();
const reelThree = new Reel();


//Get DOM elements
const reelOneText= document.querySelector('.one'); 
const reelTwoText= document.querySelector('.two'); 
const reelThreeText= document.querySelector('.three'); 
const balanceText= document.querySelector('.balance'); 
const winningsText= document.querySelector('.winnings'); 
const depositFundsText = document.querySelector('.deposit');


const myAudioContext = new AudioContext();


function setInitalValues() {    
    updateReels(getSpin());
    balanceText.innerHTML=balance;
    winningsText.innerHTML=winnings;
}


async function startGame() {

if (checkFunds()) {
    let thisSpin = getSpin();
    clearWinnings();
    takeFunds(cost);
    let delay = await spinAnimation(10);
    updateReels(thisSpin);
    prizeFactor=checkIfWinner(thisSpin);
    if (prizeFactor > 0) {
        delay= await playWinnerSound();
        addWinnings(cost*prizeFactor);
    } else {
            //nothing really
        }
    } else {
        //nothing much
    };
 }


function takeFunds(cost) {
    balance=balance-cost;
    updateBalance(balance);
}

function depositFunds(deposit) {
    balance = balance + deposit;
    updateBalance(balance);
}


function updateBalance(newBalance) {
    balanceText.innerHTML=newBalance;
}

function checkFunds() {
    if (balance-cost < 0) {
        return false;
    } return true;
}

function getSpin() {
    let thisSpin = [];
    thisSpin.push(reelOne.pickSymbol());
    thisSpin.push(reelTwo.pickSymbol());
    thisSpin.push(reelThree.pickSymbol());
    return thisSpin;
}

async function spinAnimation(v) {
        for (let i=0; i < v; i++) {
        updateReels(getSpin());
        beep(10,200,5);
        let delay = await delayres(100);
    }
}

function checkIfWinner(thisSpin) {
        prizeFactor=0;
        for(var i = 0; i < winLines.length; i++) {
            let potentialWinner = true;
            for(var j = 0; j < winLines[i].length-1; j++) {
                if (winLines[i][j] != thisSpin[j]) {
                    potentialWinner = false;
                } else {
                    prizeFactor = winLines[i][3]; //very ugly way to do this
                }
            }
            if (potentialWinner == true) {
                return prizeFactor;
            }
        }
        return 0;
    }


async function playWinnerSound() {
    beep(100,600,20);
    let delay = await delayres(110);
    beep(150,800,20);
}

function addWinnings(winAmount) {
    balance=balance+(winAmount);
    updateBalance(balance);
    showWinnings(winAmount);
}


function showWinnings(winAmount) {
    winningsText.innerHTML=winAmount;
}

function clearWinnings() {
    winningsText.innerHTML=0;
}


function updateReels(thisSpin) {
    let r0 = thisSpin[0].toLowerCase();
    let r1 = thisSpin[1].toLowerCase();
    let r2 = thisSpin[2].toLowerCase();
    reelOneText.style.backgroundImage="url('img/"+r0+".png')"; 
    reelTwoText.style.backgroundImage="url('img/"+r1+".png')"; 
    reelThreeText.style.backgroundImage="url('img/"+r2+".png')"; 
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }






