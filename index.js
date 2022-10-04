const palabra = "prueba";

function comenzar() {    

    let letra;
    let intentos = 3;
    let correcta;

    alert("Bienvenidx al juego del AHORCADO!\nLa palabra contiene 6 letras");
    
    while (intentos > 0) {

        console.log("Intento: " + intentos);
        letra = prompt("Ingrese letra: ");

        if (!buscar(letra,palabra)) {
            alert("La letra " + letra + " NO se encuentra en la palabra");
            intentos--;
            alert("Te quedan " + intentos + " intentos");
        }

        correcta = prompt("Conoce la palabra? (Escriba N en caso de no conocer la palabra)");
        console.log("Palabra ingresada: " + correcta);

        if (correcta != "N") {
            intentos = 0;
        }

    }

    resultado(correcta);
}

const buscar = (letra) => {
    
    let encontrado = false;

    for (let i = 0; i < palabra.length; i++) {
        if (letra === palabra.charAt(i)) {
            encontrado = true;
            alert("La letra " + letra + " se encuentra en la posición " + (i + 1));
        }
    }

    return encontrado;
}

const resultado = (correcta) => {
    
    if (correcta === palabra) {
        alert("FELICITACIONES! La palabra era " + correcta);
    } else {
        alert("Perdiste! La palabra era " + palabra);
    }

}