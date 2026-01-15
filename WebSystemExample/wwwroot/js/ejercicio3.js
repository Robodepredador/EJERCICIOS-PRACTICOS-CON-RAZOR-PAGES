(() => {
    const producto = document.getElementById('productoInput');
    const cantidadInput = document.getElementById('cantidadInput');
    const urgencia = document.getElementById('nivelUrgenciaInput');
    const btn = document.getElementById('btnCotizar');
    const resultado = document.getElementById('resultadoCotizacion'); 

    const precios = { 'Producto A': 2500, 'Producto B': 80, 'Producto C': 45 };
    const factoresUrgencia = { 'Normal': 1.0, 'Urgente': 1.1, 'Muy Urgente': 1.2 };

    const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function calcularYCargarResultado() {
        const productoSel = producto?.value || '';
        const cantidad = parseInt(cantidadInput?.value, 10);
        const nivel = urgencia?.value || '';

        if (!productoSel) { mostrarMensaje('Por favor seleccione un producto.', 'warning'); return; }
        if (!Number.isFinite(cantidad) || cantidad < 1) { mostrarMensaje('Por favor ingrese una cantidad válida (mínimo 1).', 'warning'); return; }
        if (!nivel) { mostrarMensaje('Por favor seleccione el nivel de urgencia.', 'warning'); return; }

        const precioBase = precios[productoSel];
        const factor = factoresUrgencia[nivel];
        const total = precioBase * cantidad * factor;
        mostrarMensaje(`Total: ${formatter.format(total)}`, 'success');
    }

    if (btn) btn.addEventListener('click', e => { e.preventDefault(); calcularYCargarResultado(); });
})();