const grid = document.querySelector('.grid');
const corpo = document.querySelector('.corpo');
const spanPlayer = document.querySelector('.player');

const timer = document.querySelector('.timer');

const characters = [
    'img2',
    'img4',
    'img5',
    'img6',
    'img9',
    'img10',
    'img11',
    'img12',
    'img13',
]

const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled_card');
    
    if (disabledCards.length == 18){
        setTimeout(function() {
            clearInterval(this.loop);
            corpo.style.backgroundColor = 'silver';
        }, 600);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    
    if (firstCharacter == secondCharacter){
        
        firstCard.firstChild.classList.add('disabled_card');
        secondCard.firstChild.classList.add('disabled_card');
        firstCard = '';
        secondCard = '';
        
        checkEndGame();
        
    } else{
        setTimeout(function() {
            firstCard.classList.remove('reveal_card');
        secondCard.classList.remove('reveal_card');
        firstCard = '';
        secondCard = '';
        }, 700);
    }
}

const revealCard = ({ target }) => {
    
    if (target.parentNode.className.includes('reveal_card')){
        return;
    }
    
    if (firstCard == ''){
        target.parentNode.classList.add('reveal_card');
        firstCard = target.parentNode;
    } else if(secondCard == ''){
        
        target.parentNode.classList.add('reveal_card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage = `url('../images/${character}.jpg')`;
    
    card.appendChild(front);
    card.appendChild(back);
    
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    
    return card;
}

const loadGame = () => {
    
    const duplicateCharacters = [ ...characters, ...characters ];
    
    const shuffledArray = duplicateCharacters.sort(() => Math.random()-0.5);
    
    shuffledArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    
    this.loop = setInterval(() => {
        
        const currentTime = +timer.innerHTML;
        
        timer.innerHTML = currentTime+1;
        
        
    }, 1000);
    
}

    
spanPlayer.innerHTML = "Benito";
startTimer();
loadGame();