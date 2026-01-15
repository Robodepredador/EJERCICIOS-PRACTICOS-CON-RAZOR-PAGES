(() => {

    const pesoInput = document.getElementById('pesoInput');
    const alturaInput = document.getElementById('alturaInput');
    const btn = document.getElementById('btnCalcular');
    const resultado = document.getElementById('resultadoIMC');

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    function clasificarIMC(imc) {
        if (imc < 18.5) return 'Bajo peso';
        if (imc < 25) return 'Normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidad';
    }

    function procesarIMC() {
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        if (!Number.isFinite(peso) || peso <= 0) {
            mostrarMensaje('Ingrese un peso válido.', 'warning');
            return;
        }

        if (!Number.isFinite(altura) || altura <= 0) {
            mostrarMensaje('Ingrese una altura válida.', 'warning');
            return;
        }

        const imc = calcularIMC(peso, altura);
        const clasificacion = clasificarIMC(imc);

        mostrarMensaje(`Su IMC es ${imc.toFixed(2)} (${clasificacion}).`, 'success');
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarIMC();
    });

})();
