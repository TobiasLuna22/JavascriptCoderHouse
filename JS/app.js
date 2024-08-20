function calcularPlazoFijo() {
    let capital = prompt("Ingrese el monto inicial:");
    let interes = prompt("Ingrese la tasa de interés anual (%):");
    let meses = prompt("Ingrese la cantidad de meses:");

    if (capital > 0 && interes > 0 && meses > 0) {
        let interesMensual = (interes / 100) / 12;
        let montoFinal = capital * Math.pow(1 + interesMensual, meses);
        console.log("Monto Final: $" + montoFinal.toFixed(2));
    } else {
        console.log("Por favor, ingrese valores válidos.");
    }
}

calcularPlazoFijo();
