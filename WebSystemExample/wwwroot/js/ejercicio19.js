(() => {
    const btn = document.getElementById('btnCalcularCredito');
    const resultado = document.getElementById('resultadoCredito');

    const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

    const calcularCuotaMensual = (monto, tasaAnual, cuotas) => {
        const tasaMensual = (tasaAnual / 100) / 12;
        const factor = Math.pow(1 + tasaMensual, cuotas);
        const cuota = monto * (tasaMensual * factor) / (factor - 1);

        return cuota;
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }

    function procesarCredito() {
        const monto = parseFloat(document.getElementById('montoInput').value);
        const tea = parseFloat(document.getElementById('tasaInput').value);
        const nCuotas = parseInt(document.getElementById('cuotasInput').value);

        if (isNaN(monto) || monto <= 0 || isNaN(tea) || tea <= 0 || isNaN(nCuotas) || nCuotas <= 0) {
            mostrarMensaje('Por favor, ingresa valores válidos y mayores a cero.', 'warning');
            return;
        }

        const cuotaMensual = calcularCuotaMensual(monto, tea, nCuotas);
        const totalPagar = cuotaMensual * nCuotas;
        const interesesTotales = totalPagar - monto;

        mostrarMensaje(`
            <div class="text-start">
                <strong>Resultado de Simulación:</strong><br>
                Cuota Mensual: <strong>${formatter.format(cuotaMensual)}</strong><br>
                <hr>
                Monto Prestado: ${formatter.format(monto)}<br>
                Total de Intereses: ${formatter.format(interesesTotales)}<br>
                <strong>Pago Total Estimado: ${formatter.format(totalPagar)}</strong>
            </div>
        `, 'success');
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarCredito();
        });
    }
})();