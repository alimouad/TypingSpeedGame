const paragraphs = ["It can also be a fun way to surprise others. You might choose to share a random sentence on social media just to see what type of reaction it garners from others. It's an unexpected move that might create more conversation than a typical post or tweet.",
    "He dropped the ball. While most people would think that this was a metaphor of some type, in Joe's case it was absolutely literal. He had hopes of reaching the Major League and that dream was now it great jeopardy. All because he had dropped the ball.",
    "It was difficult for him to admit he was wrong. He had been so certain that he was correct and the deeply held belief could never be shaken. Yet the proof that he had been incorrect stood right before his eyes."
]


let paragraph = document.querySelector('.content p')
let inputField = document.querySelector('.textInput')
let timeTag = document.querySelector('.timer span')
const popUp = document.querySelector('.popUpMsg');
const layerGround = document.querySelector('.layerGround');
let index = mistakes = 0;
let timer;
let maxTime = timeLeft = 60;
let isTyping = false;
let score = 0;




document.addEventListener("DOMContentLoaded", function(event) {
     inputField.focus()
     generateRandomPara()
  });


// generateParagraphs-----------
function generateRandomPara(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randomIndex].split('').forEach(item =>{
        let span = `<span>${item}</span>`;
        paragraph.innerHTML += span
        })
}


function typingFunction() {
    const spans = paragraph.querySelectorAll("span");
    const inputChars = inputField.value.split('');
    const inputChar = inputChars[index];
    // Start timer once
    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    // click backspace-----
    if (inputChar == null) {
        if (index > 0) {
            index--;
            // only reduce mistakes if the removed char was actually incorrect
            if (spans[index].classList.contains("incorrect")) mistakes--;
            spans[index].classList.remove("correct", "incorrect");
        }
    } else {
        if  (index == spans.length) {
            inputField.value = inputField.value.substring(0, spans.length - 1);
            clearInterval(timer);
            checkWin()
            return;
        }
    else{
         if (spans[index].innerText === inputChar) {
            spans[index].classList.add("correct");
            score += 10;
        } else {
            spans[index].classList.add("incorrect");
            mistakes++;
            score -= 2;
        }
    }
        index++;

    }
    showDetails();
}




function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        inputField.removeEventListener('input', typingFunction)
        clearInterval(timer) 
        checkWin()
}
}

// check WIN---------
function checkWin() {
    const spans = paragraph.querySelectorAll("span");
    const totalChars = spans.length;
    const correctChars = Array.from(spans).filter(span => span.classList.contains('correct')).length;
    let resultHTML = '';

    if (correctChars == totalChars) {
        resultHTML = `
            <p class="winMsg">🎉 You WIN! 😊</p>
            <p class="scoreMsg">Score: ${score}</p>
            <button class="replay">Replay</button>
        `;
    } else {
        resultHTML = `
            <p class="lostMsg">😒 You LOST!</p>
            <p class="scoreMsg">Score: ${score}</p>
            <p class="progressMsg">${correctChars}/${totalChars} correct</p>
            <button class="replay">Replay</button>
        `;
    }
    popUp.innerHTML = resultHTML;
    popUp.style.display = 'flex';
    layerGround.style.display = 'flex';
    inputField.value = '';
    clearInterval(timer);

    const replayBtn = popUp.querySelector('.replay');
    replayBtn.addEventListener('click', () => {
        popUp.style.display = 'none';
        layerGround.style.display = 'none';
        resetGame();
    });
}


// SHOW DEtails menu--------
function showDetails(){
    let mistakeTag = document.querySelector('.mistakes span')
    let wpm = Math.round((((index - mistakes)/5 )/(maxTime - timeLeft))* 60)
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    let wpmTag = document.querySelector('.wpm span')
    wpmTag.innerText = wpm;
}


// reset the game----------
function resetGame(){
    window.location.reload()
}


inputField.addEventListener('input', typingFunction)
