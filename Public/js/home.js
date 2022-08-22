const big    = document.querySelector('.big')
const spots     = document.querySelectorAll('.spot')

// Cuando CLICK en punto
    // Saber la posición de ese punto
    // Aplicar un transform translateX al grande
    // QUITAR la clase activo de TODOS puntos
    // AÑADIR la clase activo al punto que hemos hecho CLICK

// Recorrer TODOS los punto
spots.forEach( (spot, i)=> {
    // Asignamos un CLICK a cadaPunto
    spots[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -30

        // MOVEMOS el grand
        big.style.transform = `translateX(${ operacion }%)`

        // Recorremos TODOS los punto
        spots.forEach( ( spot , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            spots[i].classList.remove('activo')
        })
        // Añadir la clase activo en el punto que hemos hecho CLICK
        spots[i].classList.add('activo')

    })
})
