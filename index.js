const palabras = ["prueba", "murcielago", "computadora", "gastroenterologo", "adivinanza", "guitarra"];

class Jugador {
    constructor(nombre, puntaje) {
        this.nombre = nombre;
        this.puntaje = puntaje;
    }
}

let puntos = 0;

const comenzar = () => {
    console.log(palabras);
    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let letra;
    let intentos = 3;
    let correcta;


    alert("La palabra contiene " + palabraSeleccionada.length + " letras");

    while (intentos > 0) {

        console.log("Intento: " + intentos);
        letra = prompt("Ingrese letra: ");

        if (!buscar(letra, palabraSeleccionada)) {
            alert("La letra " + letra + " NO se encuentra en la palabra");
            intentos--;
            alert("Te quedan " + intentos + " intentos");
        } else {
            puntos += 2;
        }

        correcta = prompt("Conoce la palabra? (Escriba N en caso de no conocer la palabra)");
        console.log("Palabra ingresada: " + correcta);

        if (correcta.toUpperCase() != "N") {
            intentos = 0;
        }

    }

    eliminar(palabraSeleccionada);
    resultado(correcta, palabraSeleccionada, puntos);

}

const buscar = (letra, palabraSeleccionada) => {

    let encontrado = false;

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (letra.toLowerCase() === palabraSeleccionada.charAt(i)) {
            encontrado = true;
            alert("La letra " + letra + " se encuentra en la posición " + (i + 1));
        }
    }

    return encontrado;
}

const resultado = (correcta, palabraSeleccionada, puntos) => {  
    
    if (correcta === palabraSeleccionada) {
        alert("FELICITACIONES! La palabra era " + correcta);        
    } else {
        alert("Perdiste! La palabra era " + palabraSeleccionada);
    }

    if (palabras.length == 0) {
        puntajeFinal(puntos);
    } else {
        alert("Presione el botón Jugar para obtener una nueva palabra");
    }
}

const eliminar = (palabraSeleccionada) => {

    palabras.splice(palabras.indexOf(palabraSeleccionada), 1);
    console.log(palabras);

}

const puntajeFinal = (puntos) => {
    let btnJugar = document.getElementById("btnJugar");
    btnJugar.remove();
    const jugador = new Jugador(prompt("No quedan mas palabras! Ingrese su nombre: "), puntos);
    let ganaste = document.createElement("div");
    ganaste.innerHTML = jugador.nombre + ", Tu puntaje final es: " + jugador.puntaje;
    ganaste.className = "alert alert-success col-md-4";
    document.body.append(ganaste);

}