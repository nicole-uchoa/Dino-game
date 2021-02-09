const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 260;
let isJumping = false;
let pontos = 0;

function handleKeyUp(event) { 
    if(event.keyCode === 32){
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true; 

    // setInterval: definir intervalos para o q está dentro da função ser executado
    let upInterval = setInterval(() => { 
        if(position >= 420){
            clearInterval(upInterval);

            // Descendo
            let downInterval = setInterval(() => {
                if(position <= 260) {
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }    
            }, 20);
        }else{
            // Subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20); //codigo executado a cada 20ms
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let randomTime = Math.random() * 6000;// numero aleatório entre 0 e 1

    let leftInverval = setInterval(() => { 
        
        if(cactusPosition < -60){
            clearInterval(leftInverval);
            background.removeChild(cactus);
            pontos++;
        }else if(cactusPosition > 0 && cactusPosition < 50 && position < 310) {
            clearInterval(leftInverval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo!</h1><h2 class="pontos">Sua pontuação foi: ' + pontos + ' pontos</h2>';
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 40);

    setTimeout(createCactus, randomTime); //recursividade

    console.log(pontos);
}

createCactus();

document.addEventListener('keyup', handleKeyUp) //registra um evento



