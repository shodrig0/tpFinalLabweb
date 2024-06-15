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
    let divOpcional = document.getElementById('divUsoOpcional')
    let msj = document.createElement('div') // una div nueva para colocar encabezado y lista
    msj.innerHTML = `<h2>Importante:</h2> 
                     <ul>
                        <li>El nombre y el apellido <b>no</b> deben contener caracteres especiales o números.</li>
                        <li>El correo <b>debe</b> poseer <i>@</i> y <i>'.com', '.es', '.org'</i>, etc.</li>
                        <li>Debe colocar una fecha correcta. Tenga en cuenta:
                            <ul>
                                <li><i><small>Fechas menores a 1900 no son válidas.</small></i></li>
                                <li><i><small>Asegúrese si el año es bisiesto.</small></i></li>
                                <li><i><small>No puede colocar una fecha futura.</small></i></li>
                                <li><i><small>En los meses <b>debe</b> colocar el número correspondiente.</small></i></li>
                                
                            </ul>
                        </li>
                     </ul>`

    // appendChild: agregas un nodo (elemento) como hijo en un elemento padre, en este caso a divOpcional (en el html #divUsoOpcional)
    divOpcional.appendChild(msj)
}

function anioBisiesto(anio) {
    let anioValido = false

    if (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) {
        anioValido = true
    }
    return anioValido
}

function fechaValida(dia, mes, anio) {
    // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    // array de maximo de dias SEGUN el mes
    // enero 31, febrero dependiendo de bisiesto, marzo 31, abril 30, etcetc
    const cantDiasMaxEnMes = [31, anioBisiesto(anio) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let fechaValida = true

    if (mes < 1 || mes > 12 || dia < 1 || dia > cantDiasMaxEnMes[mes - 1]) { // restar uno, el mes viene de 0
        fechaValida = false
    } else {
        const fecha = new Date(anio, mes - 1, dia)
        fechaValida = fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
    }

    return fechaValida
}

function validar() {

    let verificacion = true // bandera

    let nombre = document.getElementById('nombre')
    let apellido = document.getElementById('apellido')
    let emailIngresado = document.getElementById('email')
    let obraSocial = document.getElementById('obras_sociales') // snake_case

    // parseInt == intval
    let dia = parseInt(document.getElementById('dia').value)
    let mes = parseInt(document.getElementById('mes').value)
    let anio = parseInt(document.getElementById('anio').value)

    // cuando de error
    function printearInput(id) {
        let inputAColorear = document.getElementById(id)
        inputAColorear.style.borderColor = 'red'
        inputAColorear.style.backgroundColor = '#d9dede'
    }

    // resetear el estilo
    function desPrintearInput(id) {
        let inputSinColor = document.getElementById(id)
        inputSinColor.style.borderColor = ''
        inputSinColor.style.backgroundColor = ''
    }

    if (!expresiones.nombre.test(nombre.value)) {
        printearInput('nombre')
        verificacion = false
    } else {
        desPrintearInput('nombre')
    }

    if (!expresiones.apellido.test(apellido.value)) {
        printearInput('apellido')
        verificacion = false
    } else {
        desPrintearInput('apellido')
    }

    if (!expresiones.email.test(emailIngresado.value)) {
        printearInput('email')
        verificacion = false
    } else {
        desPrintearInput('email')
    }

    if (obraSocial.value === '') {
        printearInput('obras_sociales')
        verificacion = false
    } else {
        desPrintearInput('obras_sociales')
    }

    if (!fechaValida(dia, mes, anio)) {
        printearInput('dia')
        printearInput('mes')
        printearInput('anio')
        verificacion = false

    } else {
        desPrintearInput('dia')
        desPrintearInput('mes')
        desPrintearInput('anio')
        let fechaIngresada = new Date(anio, mes - 1, dia)
        let fechaActual = new Date()
        let limiteAnio = 1900 // para que no pongan nums negativos ni muy chicos

        if (fechaIngresada > fechaActual || anio < limiteAnio) {
            printearInput('dia')
            printearInput('mes')
            printearInput('anio')
            verificacion = false
        }
    }

    if (verificacion) {
        alert("Funciona");
    }
}

// puedo reutilizar el DOMContentLoaded? preguntar martes
// si no coloco esto no me carga el validarrrrrr
document.addEventListener('DOMContentLoaded', agregarMsjDiv, validar)

/**
 * Desistí de usar keyup como tambien de la arrow function del DOMContentLoaded
 * porque se me estaba haciendo una snowball tremenda. En otra ocasión será.
 */