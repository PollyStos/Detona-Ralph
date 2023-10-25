// Seleciona o elemento <h1> dentro do elemento com o ID "popup"
var h1Element = document.querySelector(".title");
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const menu = document.querySelector(".menu");
    const iniciarLink = document.querySelector("#start");

    // Mostra o pop-up automaticamente
    popup.style.display = "flex";
    menu.classList.add("menu");

    // Adiciona um ouvinte de eventos para fechar o pop-up quando "Iniciar" é clicado
    iniciarLink.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o link de redirecionar para outra página (comportamento padrão)
        popup.style.display = "none";
        menu.classList.remove("menu");

        // Verifica se o elemento h1 tem um filho do tipo p e remove-o, se existir
        if (h1Element.querySelector("p")) {
            h1Element.removeChild(h1Element.querySelector("p"));
        }
        startGame();
    });
});
// Obtém o botão e o pop-up pelo ID
const openButton = document.getElementById("openPopup");
const popup = document.getElementById("popup");

// Adiciona um ouvinte de eventos para abrir o pop-up
openButton.addEventListener("click", () => {
    popup.style.display = "flex";
});

// Adiciona um ouvinte de eventos para fechar o pop-up
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

function endGame(msg) {


    // Cria um novo elemento de parágrafo
    var pElement = document.createElement("p");
    const popup = document.getElementById("popup");
    const menu = document.querySelector(".menu");

    console.log(msg);
    // Define o conteúdo do parágrafo (opcional)
    pElement.textContent = `${msg}!`;

    // Anexa o parágrafo como um filho do elemento <h1>
    h1Element.appendChild(pElement);

    popup.style.display = "flex";
    menu.classList.add("menu");

    console.log(`entrei aqui e msg é ${msg}`);
}
