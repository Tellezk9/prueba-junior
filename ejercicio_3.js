/**
 * 
 * Ejercicio 3: Descifrando el Maullido Secreto
 * 
 * @param {string} maullido El maullido secreto.
 * @param {string[]} diccionarioFelino El diccionario de palabras felinas.
 * @return {string[]} Un array con todas las posibles frases felinas.
*/
var descifrarMaullido = function (maullido, diccionarioFelino) {
    //Convertimos el diccionario en un Set para optimizar el tiempo de busqueda
    const setDiccionario = new Set(diccionarioFelino)
    const memo = {};

    //Usamos Backtracking para encontrar todas las posibles palabras del maullido
    function backtrack(inicio) {
        //Evitar repetir evaluaciones ya hechas
        if (inicio in memo) return memo[inicio];

        //Si el inicio es igual que la longitud del maullido significa que ya ha recorrido exitosamente el maullido
        //Se devuelve un arreglo con una cadena vacia para indicar una camino de exito
        if (inicio === maullido.length) return [""];
        
        const resultados = []
        for (let fin = inicio + 1; fin <= maullido.length; fin++) {
            const maullidoLetras = maullido.slice(inicio, fin);//extrae las letras del maullido
            //Si alguna combinacion del maullido se encuentra dentro del diccionario
            //Repite el proceso recursivamente pero ahora inicia desde la ultima letra que se examino
            if (setDiccionario.has(maullidoLetras)) {
                const siguientesFrases = backtrack(fin);
                
                //Combina la palabra actual con todas las posibles frases obtenidas del resto del maullido
                for (const frase of siguientesFrases) {
                    // Si 'frase' es vacia, significa que 'maullidoLetras' es la ultima palabra de la frase.
                    if (frase === "") {
                        resultados.push(maullidoLetras);
                    } else {
                        // Si no es la ultima palabra, añade un espacio para separar las palabras en la frase.
                        resultados.push(maullidoLetras + " " + frase);
                    }
                }
            }
        }
        // Guarda los resultados calculados para este 'inicio' en memo antes de devolverlos.
        memo[inicio] = resultados;
        return resultados;
    }
    
    return backtrack(0);
}

function demoDescifrarMaullido() {
    const maullidoEntrada = document.getElementById("input3_maullido").value;
    const diccionarioEntradaString = document.getElementById("input3_diccionario").value;
    let diccionarioEntrada = diccionarioEntradaString.split(',').map(palabra => palabra.trim()).filter(palabra => palabra.length > 0);

    console.log(diccionarioEntrada);
    
    if (!maullidoEntrada) {
        document.getElementById("output3").textContent = "Por favor, ingresa el maullido.";
        return;
    }
    if (diccionarioEntrada.length === 0) {
        document.getElementById("output3").textContent = "Por favor, ingresa palabras en el diccionario separadas por comas.";
        return;
    }
    const resultado = descifrarMaullido(maullidoEntrada, diccionarioEntrada);
    const output = document.getElementById("output3");
    output.textContent = `maullido: ${maullidoEntrada}
Resultado: ${resultado}`;
}