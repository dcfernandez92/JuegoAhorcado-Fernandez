const nickname = document.getElementById("nickname").innerHTML = JSON.parse(localStorage.getItem("jugador")).nickname;
const containerSelectedWord = document.getElementById("container-selected-word");
const containerAlphabet = document.getElementById("alphabet-container");
const btnGetWord = document.getElementById("btn-get-word");
const points = document.getElementById("points");
let palabras = ["prueba", "murcielago", "computadora", "gastroenterologo", "adivinanza", "guitarra"];
// variable que puede ser utilizada para testear con un array con menos palabras
// let palabras = ["ab", "cd"];
const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let mostrarAlfabeto = false;
let multiplicador = 0;
let puntos = 0;
let vidas = 3;
let aciertos = 0;
let palabrasAdivinadas = 0;

for (let i = 0; i < alfabeto.length; i++) {
    const divLetraAlfabeto = document.createElement("button");
    divLetraAlfabeto.innerHTML = alfabeto[i];
    divLetraAlfabeto.style.padding = "15px";
    divLetraAlfabeto.style.margin = "5px";
    divLetraAlfabeto.className = "btn btn-secondary";
    containerAlphabet.append(divLetraAlfabeto);
}

btnGetWord.onclick = () => {
    btnGetWord.disabled = true;
    const btnAlfabeto = document.querySelectorAll("#alphabet-container button");
    for (let i = 0; i < btnAlfabeto.length; i++) {
        btnAlfabeto[i].className = "btn btn-secondary";
        btnAlfabeto[i].disabled = false;
    }
    let palabraSeleccionada = obtenerPalabra();
    eliminarPalabra(palabraSeleccionada);
    mostrarPalabra(palabraSeleccionada.toUpperCase());
}

const obtenerPalabra = () => {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

const eliminarPalabra = (palabraSeleccionada) => {
    palabras.splice(palabras.indexOf(palabraSeleccionada), 1);
}

const mostrarPalabra = (palabraSeleccionada) => {
    localStorage.setItem("palabraSeleccionada", palabraSeleccionada);
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        const divPalabra = document.createElement("div");
        divPalabra.style.padding = "25px";
        divPalabra.style.margin = "30px 5px";
        divPalabra.className = "btn btn-light";
        containerSelectedWord.appendChild(divPalabra);
    }
}

const btnLetras = document.querySelectorAll("#alphabet-container button");
for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].disabled = false;
    btnLetras[i].style.className = "btn btn-secondary";
    btnLetras[i].onclick = () => {
        if (btnGetWord.disabled) {
            seleccionarLetra(btnLetras[i]);
        }
    }
}

const seleccionarLetra = (btnLetra) => {
    btnLetra.className = "btn btn-danger";
    btnLetra.disabled = true;
    let palabraSeleccionada = localStorage.getItem("palabraSeleccionada");
    const divPalabra = document.querySelectorAll("#container-selected-word div");
    let contador = 0;

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (btnLetra.innerHTML === palabraSeleccionada.charAt(i)) {
            divPalabra[i].innerHTML = btnLetra.innerHTML;
            divPalabra[i].className = "btn btn-success";
            btnLetra.className = "btn btn-success";
            btnLetra.disabled = true;
            contador++;
            aciertos++;
        }
    }
    verificarPuntaje(contador);
}

const verificarPuntaje = (contador) => {
    if (contador != 0) {
        multiplicador += 1;
        let jugador = JSON.parse(localStorage.getItem("jugador"));
        puntos = jugador.puntos;
        jugador.puntos += contador * multiplicador;
        points.innerHTML = jugador.puntos;
        localStorage.setItem("jugador", JSON.stringify(jugador));
    } else {
        multiplicador = 0;
        vidas--;
        let life = document.getElementById("heart-" + (vidas + 1));
        life.remove();
    }
    verificarResultado();
}

const verificarResultado = () => {
    let palabraSeleccionada = localStorage.getItem("palabraSeleccionada");
    if (vidas == 0) {
        fin(false);
    }
    if (aciertos == palabraSeleccionada.length) {
        palabrasAdivinadas++;
        mostrarAlertPalabra(palabraSeleccionada);
        sleep(1000).then(() => {
            fin(true);
        });
    }
}

const mostrarAlertPalabra = (palabraSeleccionada) => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'PERFECTO!',
        text: "Adivinaste la palabra " + palabraSeleccionada,
        showConfirmButton: false,
        timer: 3000
    })
}
const fin = (ganador) => {
    aciertos = 0;

    if ((ganador) && (palabras.length != 0)) {
        containerSelectedWord.innerHTML = "";
        btnGetWord.disabled = false;
    } else {
        verificarTopScore();
        generarConfetti();
        mostrarMensajeFinal();
        sleep(5000).then(() => {
            window.location.href = "../index.html";
        });

    }
}

const verificarTopScore = () => {
    let listaTopScore = JSON.parse(localStorage.getItem("listaMejoresJugadores"));
    let jugador = JSON.parse(localStorage.getItem("jugador"));
    let menorEncontrado = false;
    for (let i = 0; i < listaTopScore.length; i++) {
        if (jugador.puntos > listaTopScore[i].puntos && !menorEncontrado) {
            menorEncontrado = true;
            listaTopScore.splice(i, 0, jugador);
            listaTopScore.pop();
        }
    }
    localStorage.setItem("listaMejoresJugadores", JSON.stringify(listaTopScore));
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const mostrarMensajeFinal = () => {

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Puntuación Total: ' + JSON.parse(localStorage.getItem("jugador")).puntos,
        text: "Cantidad de palabras adivinadas: " + palabrasAdivinadas,
        showConfirmButton: false,
        timer: 4000
    })
}

const generarConfetti = () => {
    tsParticles.load("tsparticles", {
        "fullScreen": {
            "zIndex": 1
        },
        "particles": {
            "number": {
                "value": 0
            },
            "color": {
                "value": [
                    "#00FFFC",
                    "#FC00FF",
                    "#fffc00"
                ]
            },
            "shape": {
                "type": "circle",
                "options": {}
            },
            "opacity": {
                "value": 1,
                "animation": {
                    "enable": true,
                    "minimumValue": 0,
                    "speed": 2,
                    "startValue": "max",
                    "destroy": "min"
                }
            },
            "size": {
                "value": 4,
                "random": {
                    "enable": true,
                    "minimumValue": 2
                }
            },
            "links": {
                "enable": false
            },
            "life": {
                "duration": {
                    "sync": true,
                    "value": 5
                },
                "count": 1
            },
            "move": {
                "enable": true,
                "gravity": {
                    "enable": true,
                    "acceleration": 10
                },
                "speed": {
                    "min": 10,
                    "max": 20
                },
                "decay": 0.1,
                "direction": "none",
                "straight": false,
                "outModes": {
                    "default": "destroy",
                    "top": "none"
                }
            },
            "rotate": {
                "value": {
                    "min": 0,
                    "max": 360
                },
                "direction": "random",
                "move": true,
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "move": true,
                "value": {
                    "min": 0,
                    "max": 360
                },
                "animation": {
                    "enable": true,
                    "speed": 60
                }
            },
            "roll": {
                "darken": {
                    "enable": true,
                    "value": 25
                },
                "enable": true,
                "speed": {
                    "min": 15,
                    "max": 25
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "move": true,
                "speed": {
                    "min": -15,
                    "max": 15
                }
            }
        },
        "emitters": {
            "life": {
                "count": 5,
                "duration": 0.1,
                "delay": 0.4
            },
            "rate": {
                "delay": 0.1,
                "quantity": 150
            },
            "size": {
                "width": 0,
                "height": 0
            }
        }
    });

}