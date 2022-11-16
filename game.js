const nickname = document.getElementById("nickname").innerHTML = JSON.parse(localStorage.getItem("jugador")).nickname;
const containerSelectedWord = document.getElementById("container-selected-word");
const containerAlphabet = document.getElementById("alphabet-container");
const btnGetWord = document.getElementById("btn-get-word");
const points = document.getElementById("points");

let palabras = ["prueba", "guitarra"];
const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let mostrarAlfabeto = false;
let multiplicador = 0;
let puntos = 0;
let vidas = 3;
let aciertos = 0;

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
        console.log("letra encontrada");
        multiplicador += 1;
        let jugador = JSON.parse(localStorage.getItem("jugador"));
        console.log(jugador.puntos);
        puntos = jugador.puntos;
        jugador.puntos += contador * multiplicador;
        console.log(jugador.puntos);
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
        alert("adivinaste la palabra primo");
        fin(true);
    }
}

const fin = (ganador) => {
    aciertos = 0;

    if ((ganador) && (palabras.length != 0)) {
        containerSelectedWord.innerHTML = "";
        btnGetWord.disabled = false;
    } else {
        verificarTopScore();
        alert("Puntaje final: " + JSON.parse(localStorage.getItem("jugador")).puntos);
        window.location.href = "../index.html";
    }
}

const verificarTopScore = () => {
    let listaTopScore = JSON.parse(localStorage.getItem("listaMejoresJugadores"));
    let jugador = JSON.parse(localStorage.getItem("jugador"));
    let menorEncontrado = false;
    console.table(listaTopScore);
    for(let i = 0; i < listaTopScore.length; i++){
        if(jugador.puntos > listaTopScore[i].puntos && !menorEncontrado){
            menorEncontrado = true;
            listaTopScore.splice(i,0,jugador);
            listaTopScore.pop();
        }
    }    
    console.table(listaTopScore);
    localStorage.setItem("listaMejoresJugadores", JSON.stringify(listaTopScore));
}
