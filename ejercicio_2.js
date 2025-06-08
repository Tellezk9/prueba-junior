/**
 * 
 * Ejercicio 2: Secuencia de Siesta Felina
 * 
 * @param {number[]} collares Un array con los números de collar de los gatos.
 * @return {number} La longitud de la siesta consecutiva más larga.
*/
var longitudSiesta = function (collares) {
    if (collares.length == 0) {
        return 0
    }
    //Usamos un Set para almacenar los numeros a la vez que elimina los duplicados
    const setCollares = new Set(collares);
    let siestaMasLarga = 0;

    //Iteramos sobre cada numero
    for (const collar of setCollares) {
        //Verificamos que estamos en el inicio de la cadena
        if (!setCollares.has(collar - 1)) {
            let actual = collar;
            //Cuenta la longitud de la siesta
            let contarSiesta = 1;
            //Verificamos que el numero actual+1 exista en el arreglo
            while (setCollares.has(actual + 1)) {
                //Si existe sumamos 1 al numero actual y verificamos si ese nuevo numero existe
                actual += 1;
                //Sumamos 1 a la siesta y repetimos el while hasta que el se corte la secuencia
                contarSiesta += 1;
            }
            if (contarSiesta > siestaMasLarga) {
                siestaMasLarga = contarSiesta;
            }
        }
    }

    //Regresamos la siesta mas larga
    return siestaMasLarga;
}

function demoSiestaFelina() {
    const entradaString = document.getElementById("input2").value;
    let entrada = entradaString.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    
    if (entrada.length === 0 && entradaString.trim() !== "") {
        document.getElementById("output2").textContent = "Por favor, ingresa números separados por comas.";
        return;
    }
    const resultado = longitudSiesta(entrada);
    const output = document.getElementById("output2");
    output.textContent = `Entrada: [${entrada}]
Resultado: ${resultado}`;
}