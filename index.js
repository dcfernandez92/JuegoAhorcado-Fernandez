const palabras = ["prueba", "murcielago", "computadora", "gastroenterologo", "adivinanza", "guitarra"];
const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let btnJugar = document.getElementById("btnJugar");
let inicio = document.getElementById("inicio");
const btnNuevaPalabra = document.createElement("button");
btnNuevaPalabra.setAttribute("id","obtenerPalabra");
let aciertos = 0;


btnJugar.onclick = () => {
    jugar();
}

const jugar = () => {
    let palabraSeleccionada = obtenerPalabra(palabras); 
    console.log(palabraSeleccionada);

    inicializar(palabraSeleccionada);

    const btnLetras = document.querySelectorAll("#idPrueba button");
    for (let i = 0; i < btnLetras.length; i++) {
        btnLetras[i].disabled = false;
        btnLetras[i].style.className = "btn btn-secondary";
        btnLetras[i].onclick = (event) => {
            seleccionarLetra(event, palabraSeleccionada);
        }
    }   

}

const obtenerPalabra = (palabras) => {
    return palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
}

const inicializar = (palabraSeleccionada) => {    
    mostrarPalabra(palabraSeleccionada);
    obtenerDatos();
}

const mostrarPalabra = (palabraSeleccionada) => {
    
    const contJuego = document.createElement("div");
    contJuego.className = "contenedor-palabra";
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        const divPalabra = document.createElement("div");
        divPalabra.style.padding = "25px";
        divPalabra.style.margin = "30px 5px";
        divPalabra.className = "btn btn-light";
        contJuego.appendChild(divPalabra);
    }

    inicio.replaceWith(contJuego);
    mostrarBotonesLetras(contJuego);
}

const mostrarBotonesLetras = (contJuego) => {
    divContenedorLetras = document.createElement("div");
    divContenedorLetras.setAttribute("id", "idPrueba");
    divContenedorLetras.style.width = "45%";
    for (let i = 0; i < alfabeto.length; i++) {
        divLetra = document.createElement("button");
        divLetra.innerHTML = alfabeto[i];
        divLetra.style.padding = "15px";
        divLetra.style.margin = "5px";
        divLetra.className = "btn btn-secondary";
        divContenedorLetras.append(divLetra);
    }
    contJuego.insertAdjacentElement("afterend", divContenedorLetras);
}

const obtenerDatos = () => {
    const divDatos = document.createElement("div");
    divDatos.style.display = "flex";
    divDatos.style.flexDirection = "column";    
    btnNuevaPalabra.style.height = "40px";
    btnNuevaPalabra.className = "btn btn-info";
    btnNuevaPalabra.disabled = true;
    btnNuevaPalabra.innerHTML = "Obtener Palabra";
    divDatos.appendChild(btnNuevaPalabra);  

    const vidas = document.createElement("div");
    vidas.className = "btn btn-danger";
    vidas.setAttribute("id", "vidas");
    vidas.style.height = "40px";
    vidas.innerHTML = 3;
    divDatos.appendChild(vidas);  

    const puntos = document.createElement("div");
    puntos.className = "btn btn-primary";
    puntos.setAttribute("id", "puntos");
    puntos.style.height = "40px";
    puntos.innerHTML = 0;
    divDatos.appendChild(puntos);  

    const divContenedorLetras = document.getElementById("idPrueba");
    divContenedorLetras.insertAdjacentElement("afterend", divDatos);
}

const seleccionarLetra = (event, palabraSeleccionada) => {
    const button = event.target;
    button.className = "btn btn-danger";
    button.disabled = true;
    const letra = button.innerHTML;

    const divPalabra = document.querySelectorAll(".contenedor-palabra div");
    let encontrado = false;
    let puntos = 0;
    
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (letra === palabraSeleccionada.charAt(i)) {
            divPalabra[i].innerHTML = letra;
            divPalabra[i].className = "btn btn-success";
            button.className = "btn btn-success";
            button.disabled = true;
            encontrado = true;
            puntos+=2;
            aciertos+=1;
        }
    }
    
    verificarDatos(encontrado,puntos,palabraSeleccionada);
}

const verificarDatos = (encontrado,puntos,palabraSeleccionada
    ) => {

    const puntajeTotal = document.getElementById("puntos");
    puntajeTotal.innerHTML = parseInt(puntajeTotal.innerHTML) + puntos;

    if(!encontrado){
        const vidasTotales = document.getElementById("vidas");
        vidasTotales.innerHTML = parseInt(vidasTotales.innerHTML) - 1;
        console.log(vidasTotales.innerHTML);
        if(vidasTotales.innerHTML == 0){
            alert("No adivinaste la palabra! Volve a intentarlo.");
            finDelJuego();       
        }
    }else if(aciertos==palabraSeleccionada.length) {
        alert("Felicitaciones, Adivinaste la palabra!");
        finDelJuego();
    }

}
