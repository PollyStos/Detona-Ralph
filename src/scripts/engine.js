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
});

class Game {
    constructor() {
        this.msg = '';
        this.speed = 1000;
        this.state = {
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
                timeId: null,
                countDownTimeId: null,
            }
        };

        this.view = {
            iniciarLink: document.querySelector("#start"),
        };

        // Adicione um ouvinte de eventos para fechar o pop-up quando "Iniciar" é clicado
        this.view.iniciarLink.addEventListener("click", (e) => {
            e.preventDefault();
            game.view.popup.style.display = "none";
            game.view.menu.classList.remove("menu");

            if (game.view.h1Element.querySelector("p")) {
                game.view.h1Element.removeChild(game.view.h1Element.querySelector("p"));
            }

            this.startGame();
        });

    }

    resetGame() {
        this.speed = 1000;
        this.saveMeuRecord();

        this.state.values.gameVelocity = 1000;
        this.state.values.hitPosition = 0;
        this.state.values.result = 0;
        this.state.values.currentTime = 60;
        this.state.values.countlive = 3;
        this.state.actions.timeId = null;
        this.state.actions.countDownTimeId = null;
        // Outras variáveis podem ser redefinidas conforme necessário
    }

    saveMeuRecord() {
        localStorage.setItem('meuRecord', game.value.meuRecord);
    }

    loadMeuRecord() {
        const record = localStorage.getItem('meuRecord');
        if (record) {
            game.value.meuRecord = parseInt(record);
        }
    }

   velocity() {
        this.speed -= 2;
        this.state.actions.timeId=null;
        this.state.actions.timeId = setInterval(this.randomSquare, this.speed);
    }

    updateLiveUI() {
        this.state.view.live.innerHTML = "";

        for (let i = 0; i < this.state.values.countlive; i++) {
            const img = document.createElement("img");
            img.src = "./src/images/hart.svg";
            img.alt = "vidas";
            this.state.view.live.appendChild(img);
        }
    }

    playSound(audioName) {
        let audio = new Audio(`/src/sounds/${audioName}.m4a`);
        audio.volume = 0.2;
        audio.play();
    }

    countDown() {
        this.state.values.currentTime--;
        this.state.view.timeLeft.textContent = this.state.values.currentTime;

        if (this.state.values.currentTime <= 0) {
            clearInterval(this.state.actions.countDownTimeId);
            clearInterval(this.state.actions.timeId);
            this.msg = "Time's Up";
            this.state.view.score.textContent = 0;
            endGame(this.msg, this.state.values.result);
        }

        if (this.state.values.countlive <= 0) {
            clearInterval(this.state.actions.countDownTimeId);
            clearInterval(this.state.actions.timeId);
            this.msg = "Game over";
            this.state.view.score.textContent = 0;

            endGame(this.msg, this.state.values.result);
        }

    }

    randomSquare() {
        this.state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = this.state.view.squares[randomNumber];
        this.state.values.hitPosition = randomSquare.id;
        randomSquare.classList.add("enemy");
    }

    addListenerHitBox() {
        this.state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                switch (square.id === this.state.values.hitPosition) {
                    case true:
                        console.log("true");
                        this.state.values.result++;
                        this.state.view.score.textContent = this.state.values.result;
                        this.state.values.countlive = this.state.values.countlive;
                        this.state.values.hitPosition = null;
                        this.state.values.currentTime += 1;
                        this.state.view.squares.forEach((square) => {
                            square.classList.remove("enemy");
                        });
                        this.velocity();
                        this.playSound("hit");
                        break;
                    case false:
                        console.log("false");
                        this.state.values.countlive--;
                        this.updateLiveUI();
                        break;
                }
            });
        });
    }

    startGame() {
        this.resetGame();
        this.loadMeuRecord();
        // Inicialize o jogo
        this.state.actions.timeId = setInterval(this.randomSquare.bind(this), 1000);
        this.state.actions.countDownTimeId = setInterval(this.countDown.bind(this), 1000);
        this.updateLiveUI();
        this.addListenerHitBox();
    }
}
function endGame(msg, result) {
    if (result >= game.value.meuRecord) {
        game.value.meuRecord = result;
    }
    
    game.view.popup.style.display = "flex";
    game.view.h1Element.innerHTML = `<p>${msg}!</p>`;
    game.view.score.textContent = result;
    game.view.record.textContent =  game.value.meuRecord;
}
const newGame = new Game();