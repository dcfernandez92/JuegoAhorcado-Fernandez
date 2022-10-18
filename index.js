const palabras = ["prueba", "murcielago", "computadora", "gastroenterologo", "adivinanza","guitarra"];

function comenzar() {
    console.log(palabras);
    let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    let letra;
    let intentos = 3;
    let correcta;

    alert("Bienvenidx al juego del AHORCADO!\nLa palabra contiene " + palabraSeleccionada.length + " letras");

    while (intentos > 0) {

        console.log("Intento: " + intentos);
        letra = prompt("Ingrese letra: ");

        if (!buscar(letra, palabraSeleccionada)) {
            alert("La letra " + letra + " NO se encuentra en la palabra");
            intentos--;
            alert("Te quedan " + intentos + " intentos");
        }

        correcta = prompt("Conoce la palabra? (Escriba N en caso de no conocer la palabra)");
        console.log("Palabra ingresada: " + correcta);

        if (correcta.toUpperCase() != "N") {
            intentos = 0;
        }

    }

    resultado(correcta, palabraSeleccionada);
}

const buscar = (letra, palabraSeleccionada) => {

    let encontrado = false;

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (letra === palabraSeleccionada.charAt(i)) {
            encontrado = true;
            alert("La letra " + letra + " se encuentra en la posición " + (i + 1));
        }
    }

    return encontrado;
}

const resultado = (correcta, palabraSeleccionada) => {

    if (correcta === palabraSeleccionada) {
        alert("FELICITACIONES! La palabra era " + correcta);
        eliminar(palabraSeleccionada);
        if (palabras.length == 0) {
            fin();
        } else{
            alert("Presione el botón Jugar para obtener una nueva palabra");
        }
    } else {
        alert("Perdiste! Presiona jugar y volve a intentarlo.");
    }


}

const eliminar = (palabraSeleccionada) => {

    palabras.splice(palabras.indexOf(palabraSeleccionada), 1);
    console.log(palabras);

}

const fin = () =>{
    let btnJugar = document.getElementById("btnJugar");
    btnJugar.remove();
    let ganaste = document.createElement("div");
    ganaste.innerHTML="Felicidades! Adivinaste las 6 palabras del Ahorcado";
    ganaste.className = "alert alert-success col-md-4";
    document.body.append(ganaste);

}
