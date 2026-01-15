(() => {

    const codigoInput = document.getElementById('codigoInput');
    const btn = document.getElementById('btnBuscar');
    const resultado = document.getElementById('resultadoEnvio');

    // Base de datos simulada
    const estados = {
        'ENV001': 'En tránsito',
        'ENV002': 'En reparto',
        'ENV003': 'Entregado',
        'ABC123': 'En tránsito',
        'XYZ999': 'Entregado'
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function buscarEstado(codigo) {
        return estados[codigo] || null;
    }

    function procesarBusqueda() {
        const codigo = codigoInput.value.trim().toUpperCase();

        if (!codigo) {
            mostrarMensaje('Ingrese un código de seguimiento.', 'warning');
            return;
        }

        const estado = buscarEstado(codigo);

        if (!estado) {
            mostrarMensaje('Código no encontrado.', 'danger');
        } else {
            mostrarMensaje(`Estado del envío: <strong>${estado}</strong>`, 'success');
        }
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarBusqueda();
    });

})();
