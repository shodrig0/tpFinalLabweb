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

function agregarMsjDiv() {
    let divOpcional = document.getElementById('divUsoOpcional');
    let msj = document.createElement('p');
    msj.innerHTML = `El nombre NO debe contener caracteres especiales o números.<br>
                     El apellido NO debe contener caracteres especiales o números.<br>
                     El correo DEBE poseer @ y un '.com', '.es', '.org', etc.<br>
                     Debe colocar una fecha correcta.`;
    divOpcional.appendChild(msj);
}

document.addEventListener('DOMContentLoaded', () => {
    const entradas = document.querySelectorAll('#miFormulario input')
    console.log(entradas)

    //https://es.stackoverflow.com/questions/414301/como-agregar-html-desde-javascript

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
                if (expresiones.apellido.test(e.target.value)) {
                    document.getElementById('apellido').classList.remove('validacionError')
                    document.getElementById('apellido').classList.add('validacionCorrecta')
                    actualizarMensajeDiv(document.getElementById('apellido'), MSJ_DIV.avisoApellido, false)
                } else {
                    document.getElementById('apellido').classList.remove('validacionCorrecta')
                    document.getElementById('apellido').classList.add('validacionError')
                    actualizarMensajeDiv(document.getElementById('apellido'), MSJ_DIV.avisoApellido, true)
                    // let msj = document.getElementById('divUsoOpcional')
                    // msj.innerHTML = MSJ_DIV.avisoApellido
                }
                break
            case "email":
                if (expresiones.email.test(e.target.value)) {
                    document.getElementById('email').classList.remove('validacionError')
                    document.getElementById('email').classList.add('validacionCorrecta')
                } else {
                    document.getElementById('email').classList.remove('validacionCorrecta')
                    document.getElementById('email').classList.add('validacionError')
                }
                break
        }
    }


    agregarMsjDiv() // agregar el msj

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
