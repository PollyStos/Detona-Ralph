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
