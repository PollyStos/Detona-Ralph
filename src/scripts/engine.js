let msg = '';

let restart = false;

const game = {
    view: {
        popup: document.getElementById("popup"),
        menu: document.querySelector(".menu"),
        iniciarLink: document.querySelector("#start"),
        h1Element: document.querySelector(".title"),
        openButton: document.getElementById("openPopup"),
        score: document.getElementById("point"),
        record: document.getElementById("record"),
    },
    value: {
        meuRecord: 0,
    }
}
document.addEventListener("DOMContentLoaded", function () {

    game.view.popup.style.display = "flex";
    game.view.menu.classList.add("menu");

    // Adiciona um ouvinte de eventos para fechar o pop-up quando "Iniciar" é clicado
    game.view.iniciarLink.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o link de redirecionar para outra página (comportamento padrão)
        game.view.popup.style.display = "none";
        game.view.menu.classList.remove("menu");

        if (game.view.h1Element.querySelector("p")) {
            game.view.h1Element.removeChild(game.view.h1Element.querySelector("p"));
        }
        startGame();
    });
});

// Adiciona um ouvinte de eventos para abrir o pop-up
// openButton.addEventListener("click", () => {
//     game.popup.style.display = "flex";
// });

// Adiciona um ouvinte de eventos para fechar o pop-up
// popup.addEventListener("click", (e) => {
//     if (e.target === popup) {
//         game.popup.style.display = "none";
//     }
// });


// let speed = 1000;

function startGame() {
    const state = {
        view: {
            squares: document.querySelectorAll(".square"),
            enemy: document.querySelector(".enemy"),
            timeLeft: document.querySelector("#time-left"),
            score: document.querySelector("#score"),
            live: document.querySelector("#lives-container"),
        },
        values: {
            gameVelocity: 1000,
            hitPosition: 0,
            result: 0,
            currentTime: 60,
            countlive: 3,
        },
        actions: {
            timeId: setInterval(randomSquare, 1000),
            countDownTimeId: setInterval(countDown, 1000),
        }
    };

    function updateLiveUI() {
        state.view.live.innerHTML = "";

        for (let i = 0; i < state.values.countlive; i++) {
            const img = document.createElement("img");
            img.src = "./src/images/hart.svg";
            img.alt = "vidas";
            state.view.live.appendChild(img);
        }
    }

    function velocity() {
        speed -= 2;
        clearInterval(state.actions.timeId);
        state.actions.timeId = setInterval(randomSquare, speed);
    }

    function playSound(audioName) {
        let audio = new Audio(`/src/sounds/${audioName}.m4a`);
        audio.volume = 0.2;
        audio.play();
    }

    function countDown() {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;

        if (state.values.currentTime <= 0) {
            clearInterval(state.actions.countDownTimeId);
            clearInterval(state.actions.timeId);
            msg = "Time's Up";
            state.view.score.textContent = 0;
            // state.values.countlive = 3;
            // speed = 1000;
            endGame(msg, state.values.result);
        }

        if (state.values.countlive <= 0) {
            clearInterval(state.actions.countDownTimeId);
            clearInterval(state.actions.timeId);
            msg = "Game over";
            state.view.score.textContent = 0;
            // state.values.countlive = 3;
            // speed = 1000;
            endGame(msg, state.values.result);
        }
    }

    function randomSquare() {
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        state.values.hitPosition = randomSquare.id;
        randomSquare.classList.add("enemy");
    }


    function addListenerHitBox() {
        state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                switch (square.id === state.values.hitPosition) {
                    case true:
                        console.log(`state.values.hitPosition ${state.values.hitPosition} square.id ${square.id} é igual? ${square.id === state.values.hitPosition}`);
                        state.values.result++;
                        state.view.score.textContent = state.values.result;
                        state.values.hitPosition = null;
                        state.values.currentTime += 1;
                        state.view.squares.forEach((square) => {
                            square.classList.remove("enemy");
                        });
                        playSound("hit");
                        console.log(`state.values.countlive-- ${state.values.countlive--} `);
                        break;
                    case false:    // velocity();
                        state.values.countlive--;
                        updateLiveUI();
                        break;
                }
            });
        });
    }

    function init() {
        updateLiveUI();
        addListenerHitBox();
        console.log(state.values.result);
    }

}

function endGame(msg, result) {

    if (result >= game.value.meuRecord) {
        game.value.meuRecord = result;
    }

    game.view.popup.style.display = "flex";
    game.view.menu.classList.add("menu");
    let pElement = document.createElement("p");
    pElement.textContent = `${msg}!`;
    game.view.h1Element.appendChild(pElement);
    game.view.score.textContent = result;
    game.view.record.textContent = game.value.meuRecord;
}