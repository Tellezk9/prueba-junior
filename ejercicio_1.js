/**
 * 
 * Ejercicio 1: Las Casitas de los Gatos Numéricos
 * 
 * @param {string} cadenaJuguetes La cadena de juguetes numéricos.
 * @return {string[]} Un array con todas las direcciones IP gatunas posibles
 */
var construirCasitas = function (cadenaJuguetes) {
    const casitasValidas = []

    //Contiene las reglas impuestas para validar que efectivamente sea una casita valida
    function esCasitaValida(segmento) {
        if (segmento.length > 1 && segmento[0] === '0') {
            return false;
        }
        const num = parseInt(segmento, 10);
        if (isNaN(num) || num < 0 || num > 255) {
            return false;
        }
        return true;
    }

    function backtrack(indiceActual, casitasActuales) {

        // Al una casita alcanzar el ancho maximo de 4 segmentos (cuatro "casitas" o partes de la IP).
        if (casitasActuales.length === 4) {
            if (indiceActual === cadenaJuguetes.length) {
                //Al una casita alcanzar el ancho maximo de 4 casitas usando todos los numeros de la cadena original sera valida
                //y la guardaremos en casitasValidas
                casitasValidas.push(casitasActuales.join('.'))
            }
            return
        }

        //bucle que recorre el arreglo de uno en uno cada posibilidad que sea una casa valida
        for (let i = 1; i <= 3; i++) {
            const siguienteIndice = indiceActual + i

            if (siguienteIndice > cadenaJuguetes.length) {
                break;
            }
            const segmento = cadenaJuguetes.substring(indiceActual, siguienteIndice)
            if (esCasitaValida(segmento)) {
                casitasActuales.push(segmento)
                backtrack(siguienteIndice, casitasActuales)
                casitasActuales.pop()
            }
        }
    }

    //Inicia la busqueda desde la posicion 0
    backtrack(0, [])
    return casitasValidas;
}



function demoConstruirCasitas() {
    const entrada = document.getElementById("input1").value;
    if (!entrada || !/^\d+$/.test(entrada)) {
        document.getElementById("output1").textContent = "Por favor, ingresa solo dígitos para la cadena de juguetes.";
        return;
    }
    const resultado = construirCasitas(entrada);
    const output = document.getElementById("output1");
    output.textContent = `cadena de juguetes: ${entrada}
Resultado: ${resultado.join(" | ")}`;
}