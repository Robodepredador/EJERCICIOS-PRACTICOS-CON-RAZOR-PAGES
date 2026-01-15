(() => {
    const pesoInput = document.getElementById('pesoInput');
    const origenInput = document.getElementById('origenInput');
    const destinoInput = document.getElementById('destinoInput');
    const btn = document.getElementById('btnCalcular');
    const resultado = document.getElementById('resultadoEnvio');

    const tablaTarifas = {
        'Lima': { 'Lima': 5.0, 'Arequipa': 12.0, 'Trujillo': 10.0 },
        'Arequipa': { 'Lima': 12.0, 'Arequipa': 5.0, 'Trujillo': 15.0 },
        'Trujillo': { 'Lima': 10.0, 'Arequipa': 15.0, 'Trujillo': 5.0 }
    };

    const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

    const calcularCostoTotal = (peso, tarifaPorKg) => peso * tarifaPorKg;

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }

    function procesarEnvio() {
        const peso = parseFloat(pesoInput.value);
        const origen = origenInput.value;
        const destino = destinoInput.value;

        if (isNaN(peso) || peso <= 0) {
            mostrarMensaje('Por favor, ingresa un peso válido mayor a 0.', 'warning');
            return;
        }
        if (!origen || !destino) {
            mostrarMensaje('Debes seleccionar origen y destino.', 'warning');
            return;
        }

        const tarifaBase = tablaTarifas[origen][destino];

        const costoFinal = calcularCostoTotal(peso, tarifaBase);

        mostrarMensaje(`
            <strong>Resumen de Envío:</strong><br>
            Ruta: ${origen} a ${destino}<br>
            Tarifa por kg: ${formatter.format(tarifaBase)}<br>
            <strong>Total a pagar: ${formatter.format(costoFinal)}</strong>
        `, 'success');
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarEnvio();
        });
    }
})();