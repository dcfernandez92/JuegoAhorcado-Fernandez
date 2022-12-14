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
        Toastify({
            text: "Debe ingresar un nickname",
            style: {
                background: "linear-gradient(to right, #d80000, #e91b1b)",
            },
            duration: 3000
        }).showToast();
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