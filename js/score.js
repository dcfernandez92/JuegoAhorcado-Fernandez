const tbody = document.getElementById("score-list-container")
const lista = JSON.parse(localStorage.getItem("listaMejoresJugadores"));

for (let i = 0; i < lista.length; i++) {
        const tr = document.createElement('tr')
        tr.innerHTML = `                
                <td>${(i+1)+"°"}</td>
                <td>${lista[i].nickname}</td>
                <td>${lista[i].puntos}</td>
                `
        tbody.append(tr)
}

/* SE OBTIENEN LOS DATOS DEL ARCHIVO data-score.json UTILIZANDO FETCH */
// const lista = document.querySelector('#score-list-container')
// fetch('../data-score.json')
//     .then((res) => res.json())
//     .then((data) => {

//         data.forEach((producto) => {
//             const tr = document.createElement('tr')
//             tr.innerHTML = `                
//                     <td>${producto.puesto}</td>
//                     <td>${producto.nombre}</td>
//                     <td>${producto.puntos}</td>
//                     `
//             lista.append(tr)
//         })
//     })