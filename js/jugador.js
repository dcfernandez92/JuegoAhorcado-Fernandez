export class Jugador {
    constructor(nickname) {
        this.nickname = nickname;
        this.puntos = 0;
    }

    saludar() {
        return "Hola mi nombre es " + this.nickname + " y mi puntaje es " + this.puntos;
    }
}