const paragraphs = ["he considered the birds to be her friends. She'd put out food for them each morning and then she'd watch as they came to the feeders to gorge themselves for the day. She wondered what they would do if something ever happened to her",
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
let maxTime = timeLeft = 20;
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

function typingFunction(){
    let spans = paragraph.querySelectorAll("span")
    let inputChar = inputField.value.split('')[index]
    if(!isTyping){
        timer = setInterval(initTimer, 1000);
        isTyping = true
    }
    
    // if typed backsppace---------
    if(inputChar == null){
        index--;
        mistakes--;
        spans[index].classList.remove("correct","incorrect") }
    else{
        // checked the typed input and span in paragraph----
        if(spans[index].innerText === inputChar){
        spans[index].classList.add('correct');
        score+= 10;
       
    }
    else {
        spans[index].classList.add('incorrect');
         mistakes++;
         score -= 2;
    }
    index++;
}
    
    let mistakeTag = document.querySelector('.mistakes span')
    let wpm = Math.round((((index - mistakes)/5 )/(maxTime - timeLeft))* 60)
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    let wpmTag = document.querySelector('.wpm span')
    wpmTag.innerText = wpm;
}



function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else{
        inputField.removeEventListener('input', typingFunction)
        clearInterval(timer)
        inputField.value = '';
         // Show overlay and popup
        popUp.style.display = 'flex';
        layerGround.style.display = 'flex';
        checkWin()
}
function checkWin(){

    let spans = paragraph.querySelectorAll("span")
    let inputChar = inputField.value.split('')[index]
    let resultHTML ='';
    if (spans[index].classList.contains('correct').length === inputChar.lenght){    
        resultHTML = `
                <p class="winMsg">🎉 You WIN! 😊</p>
                <p class="scoreMsg">Score: ${score}</p>
                <button class="replay">Replay</button>
            `;
    }else {
            resultHTML = `
                <p class="winMsg">🎉 You LOST! 😒</p>
                <p class="scoreMsg">Score: ${score}</p>
                <button class="replay">Replay</button>
            `;
    }
    popUp.innerHTML = resultHTML;
    const replayBtn = popUp.querySelector('.replay');
    replayBtn.addEventListener('click', () => {
        popUp.style.display = 'none';
        layerGround.style.display = 'none';
        // resetGame();
    });
}
}
generateRandomPara()
inputField.addEventListener('input', typingFunction)
