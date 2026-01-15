(() => {

    const tratamientoInput = document.getElementById('tratamientoInput');
    const sesionesInput = document.getElementById('sesionesInput');
    const planInput = document.getElementById('planInput');
    const btn = document.getElementById('btnCalcular');
    const resultado = document.getElementById('resultadoPresupuesto');

    const precios = {
        'Fisioterapia': 120,
        'Odontología': 200,
        'Psicología': 150
    };

    const descuentos = {
        'Ninguno': 1,
        'Prepaga X': 0.8,
        'Prepaga Y': 0.9
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function calcularTotal(precio, sesiones, factor) {
        return precio * sesiones * factor;
    }

    function procesarPresupuesto() {
        const tratamiento = tratamientoInput.value;
        const sesiones = parseInt(sesionesInput.value, 10);
        const plan = planInput.value;

        if (!tratamiento) {
            mostrarMensaje('Seleccione un tratamiento.', 'warning');
            return;
        }

        if (!Number.isFinite(sesiones) || sesiones < 1) {
            mostrarMensaje('Ingrese una cantidad válida de sesiones.', 'warning');
            return;
        }

        if (!plan) {
            mostrarMensaje('Seleccione un plan médico.', 'warning');
            return;
        }

        const precio = precios[tratamiento];
        const factor = descuentos[plan];

        const total = calcularTotal(precio, sesiones, factor);

        mostrarMensaje(`Total a pagar: S/ ${total.toFixed(2)}`, 'success');
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarPresupuesto();
    });

})();
