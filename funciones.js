/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 */

const expresiones = {
    // letras, espacios y tildes
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,

    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,

    // previo @ posterior
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

document.addEventListener('DOMContentLoaded', () => {
    const entradas = document.querySelectorAll('#miFormulario input')
    console.log(entradas)


    const validarDatos = (e) => {
        // console.log(e.target.name) targetea el nombre que posea el elemento y lo printea en consola
        // console.log('ejecución') incrementa con las teclas y los clicks por keyup (lervantar tecla) y blur (clickear fuera de input)
        switch (e.target.name) {
            case "nombre":
                if (expresiones.nombre.test(e.target.value)) {
                    // console.log(expresiones.nombre.test(e.target.value))
                    document.getElementById('nombre').classList.remove('validacionError')
                    document.getElementById('nombre').classList.add('validacionCorrecta')
                } else {
                    document.getElementById('nombre').classList.remove('validacionCorrecta')
                    document.getElementById('nombre').classList.add('validacionError')
                }
                break
            case "apellido":
                console.log('pruebaapellido')
                break
            case "email":
                console.log('pruebamail')
                break
        }
    }




    entradas.forEach((input) => {
        input.addEventListener('keyup', validarDatos)
        input.addEventListener('blur', validarDatos)
    })
})

// obtener arreglo con querySelectorAll


/**
 * expresiones regulares
 */



function validar() {
    alert("Funciona");
}
