let speed = 1000;

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        live:document.querySelector("#lives-container"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countlive:3,
    },
    actions: {
        timeId: setInterval(randomSquare, speed),
        countDownTimeId: setInterval(countDown, 1000),
    }
};

function updateLiveUI(){
    state.view.live.innerHTML="";

    for(let i=0; i<state.values.countlive;i++){
        const img = document.createElement("img");
        img.src = "./src/images/hart.svg";
        img.alt = "vidas";
        state.view.live.appendChild(img);
    }
}

function velocity(){
    clearInterval(state.actions.timeId);
    state.actions.timeId = setInterval(randomSquare, speed);
}

function playSound(audioName) {
    let audio = new Audio(`/src/sounds/${audioName}.m4a`);
    audio.volume = 0.02;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        alert("time's up! O seu resultado foi: " + state.values.result);
    }

    if (state.values.countlive <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                speed-=2;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                state.values.currentTime+=2;
                state.view.squares.forEach((square) => {
                    square.classList.remove("enemy");
                });
                playSound("hit");
                velocity();
                
            } else {
                state.values.countlive--;
                updateLiveUI();
            }
        });
    });
}

function init() {
    updateLiveUI();
    addListenerHitBox();
    console.log(state.values.result);
}

init();