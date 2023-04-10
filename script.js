const cards = [];

const gifs = [
    `<img data-test="face-up-image" src="img/bobrossparrot.gif">`,
    `<img data-test="face-up-image" src="img/explodyparrot.gif">`,
    `<img data-test="face-up-image" src="img/fiestaparrot.gif">`,
    `<img data-test="face-up-image" src="img/metalparrot.gif">`,
    `<img data-test="face-up-image" src="img/revertitparrot.gif">`,
    `<img data-test="face-up-image" src="img/tripletsparrot.gif">`,
    `<img data-test="face-up-image" src="img/unicornparrot.gif">`
];

let contar = 0;

let selecaoStatus = false;

let cartaoEscolhido = null;

let cartaoIgual = [];

let quantidadeCartas = null;

let quantidadePares = null;

function comecarGame() {

    let quantidadeCartas = parseInt(prompt(`Quantas cartas deseja jogar?
Escolha um número par entre 4 e 14!`));

    while ((quantidadeCartas % 2 !== 0) || (quantidadeCartas < 4) || (quantidadeCartas > 14)) {
        quantidadeCartas = parseInt(prompt(`Atenção!!
Digite um número par entre 4 e 14!`));
    };

    gifs.sort(randomCards);

    for (let i = 0; i < (quantidadeCartas / 2); i++) {
        cards.push(gifs[i], gifs[i]);
    };

    quantidadePares = quantidadeCartas / 2;
    cards.sort(randomCards);

    for (let i = 0; i < quantidadeCartas; i++) {
        const box = document.querySelector('.box-cards');
        box.innerHTML += `
        <div data-test="card" class="card" onclick="clickCard(this)" id="${i}">
            <div class="front-face face">
                <img data-test="face-down-image" src="img/back.png">
            </div>
            <div class="back-face face">
                ${cards[i]}
            </div>
        </div>`
    };
};

function randomCards() {
    return Math.random() - 0.5;
};

comecarGame()

function clickCard(card) {
    const backFace = card.querySelector('.back-face');
    card.removeAttribute('onclick');

    if (contar == 0) {
        time = setInterval(timeCounter, 1000);
    };

    if (backFace.classList.contains('.selected-back') === false) {
        spinCard(card);
        contar++;
        if (selecaoStatus === false) {
            cartaoEscolhido = card;
            selecaoStatus = true;
        } else if (cartaoEscolhido.innerHTML !== card.innerHTML) {
            selecaoStatus = false;
            card.setAttribute('onclick','clickCard(this)');
            cartaoEscolhido.setAttribute('onclick','clickCard(this)');
            setTimeout(spinCard, 1000, cartaoEscolhido);
            setTimeout(spinCard, 1000, card);
            cartaoEscolhido = null;
        } else {
            selecaoStatus = false;
            cartaoIgual.push(card.classList[1]);
        } if (cartaoIgual.length === quantidadePares) {
            clearTimeout(time);
            setTimeout(finalGame, 1000);
        };
    };
};

function spinCard(card) {
    const frontFace = card.querySelector('.front-face');
    frontFace.classList.toggle('selected-front');
    const backFace = card.querySelector('.back-face');
    backFace.classList.toggle('selected-back');
};

function timeCounter() {
    const clock = document.querySelector('.clock');
    clock.innerHTML = parseInt(clock.innerHTML) + 1;
};

function finalGame() {

    const clock = document.querySelector('.clock');

    alert(`Você ganhou em ${contar} jogadas! A duração do jogo foi de ${clock.innerHTML} segundos!`);

    let restart = prompt('Você gostaria de reiniciar a partida? (sim ou não)');

    while (restart !== 'sim' && restart !== 'não') {
        restart = prompt(`Atenção!!
Digite [sim] ou [não]!`);
    };
    if (restart === 'sim') {
        location.reload(true);
    } else {
        alert(`Obrigado por jogar Parrot Card Game!
Até Logo!`)
    };

};