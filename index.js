import {
    Jugador
} from "./jugador.js";
const jugar = document.getElementById("jugar");
const nick = document.getElementById("nick");

jugar.onclick = () => {
    if (nick.value != "") {
        let listaJugadores;
        let jugador = new Jugador(nick.value.toUpperCase());
        localStorage.setItem("jugador", JSON.stringify(jugador));
        console.log("check 01");
        if (!JSON.parse(localStorage.getItem("listaMejoresJugadores"))) {
            console.log("check 02");
            inicializarListaJugadores();
        }
        jugar.href = "./pages/game.html";
    } else {
        // TODO: ver como informar campo incompleto (alert/sweetAlert2/toast)
        alert("complete nickname");
    }
}

const inicializarListaJugadores = () => {
    const mejoresJugadores = [{
            nickname: "FFFFF",
            puntos: 0
        },
        {
            nickname: "FFFFF",
            puntos: 0
        },
        {
            nickname: "FFFFF",
            puntos: 0
        },
        {
            nickname: "FFFFF",
            puntos: 0
        },
        {
            nickname: "FFFFF",
            puntos: 0
        }
    ];

    localStorage.setItem("listaMejoresJugadores", JSON.stringify(mejoresJugadores));
}