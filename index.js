const paragraphs = ["he considered the birds to be her friends. ",
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
let maxTime = timeLeft = 15;
let isTyping = false;
let score = 0;



// generateParagraphs-----------

function generateRandomPara(){
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randomIndex].split('').forEach(item =>{
        let span = `<span>${item}</span>`;
        paragraph.innerHTML += span
        })
        paragraph.addEventListener('click', () => inputField.focus())
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
    } 
    else {
        if  (index >= spans.length) {
            inputField.value = inputField.value.substring(0, spans.length);
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
         // Show overlay and popup
        
        checkWin()
}
}

function checkWin() {
    const spans = paragraph.querySelectorAll("span");
    const totalChars = spans.length;
    // Count how many spans are correct
    const correctChars = Array.from(spans).filter(span => span.classList.contains('correct')).length;
    // Determine win or loss
    let resultHTML = '';

    if (correctChars === totalChars) {
        // 🏆 All characters are correct → Win
        resultHTML = `
            <p class="winMsg">🎉 You WIN! 😊</p>
            <p class="scoreMsg">Score: ${score}</p>
            <button class="replay">Replay</button>
        `;
    } else {
        // 😒 Some characters wrong or missing → Lose
        resultHTML = `
            <p class="lostMsg">😒 You LOST!</p>
            <p class="scoreMsg">Score: ${score}</p>
            <p class="progressMsg">${correctChars}/${totalChars} correct</p>
            <button class="replay">Replay</button>
        `;
    }

    // 🧩 Show the popup
    popUp.innerHTML = resultHTML;
    popUp.style.display = 'flex';
    layerGround.style.display = 'flex';

    // 🧹 Clear input and stop typing
    inputField.value = '';
    clearInterval(timer);

    // 🔁 Replay logic
    const replayBtn = popUp.querySelector('.replay');
    replayBtn.addEventListener('click', () => {
        popUp.style.display = 'none';
        layerGround.style.display = 'none';
        resetGame();
    });
}

function showDetails(){

    let mistakeTag = document.querySelector('.mistakes span')
    let wpm = Math.round((((index - mistakes)/5 )/(maxTime - timeLeft))* 60)
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    let wpmTag = document.querySelector('.wpm span')
    wpmTag.innerText = wpm;
}

function resetGame(){
    window.location.reload()
}
generateRandomPara()

inputField.addEventListener('input', typingFunction)
