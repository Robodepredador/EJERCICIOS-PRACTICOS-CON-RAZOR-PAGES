(() => {

    const stockActualInput = document.getElementById('stockActual');
    const cantidadInput = document.getElementById('cantidadInput');
    const tipoMovimiento = document.getElementById('tipoMovimiento');
    const btn = document.getElementById('btnActualizar');
    const resultado = document.getElementById('resultadoStock');

    let stock = 10; // stock inicial
    const stockMinimo = 2;

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function actualizarPantalla() {
        stockActualInput.value = stock;
    }

    function procesarMovimiento() {
        const cantidad = parseInt(cantidadInput.value, 10);
        const tipo = tipoMovimiento.value;

        if (!Number.isFinite(cantidad) || cantidad < 1) {
            mostrarMensaje('Ingrese una cantidad válida.', 'warning');
            return;
        }

        if (!tipo) {
            mostrarMensaje('Seleccione el tipo de movimiento.', 'warning');
            return;
        }

        if (tipo === 'entrada') {
            stock += cantidad;
        } else if (tipo === 'salida') {
            if (cantidad > stock) {
                mostrarMensaje('No hay suficiente stock para realizar la salida.', 'danger');
                return;
            }
            stock -= cantidad;
        }

        actualizarPantalla();

        if (stock === 0) {
            mostrarMensaje('⚠️ Stock agotado.', 'danger');
        }
        else if (stock <= stockMinimo) {
            mostrarMensaje('⚠️ Stock en nivel mínimo.', 'warning');
        }
        else {
            mostrarMensaje('Stock actualizado correctamente.', 'success');
        }

        cantidadInput.value = '';
        tipoMovimiento.value = '';
    }

    actualizarPantalla();

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarMovimiento();
    });

})();
