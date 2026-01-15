(() => {

    const nombreInput = document.getElementById('nombreInput');
    const especialidadInput = document.getElementById('especialidadInput');
    const fechaInput = document.getElementById('fechaInput');
    const btn = document.getElementById('btnReservar');
    const resultado = document.getElementById('resultadoCita');

    const disponibilidad = {
        'Medicina General': ['2026-01-16', '2026-01-17', '2026-01-20'],
        'Pediatría': ['2026-01-16', '2026-01-21'],
        'Dermatología': ['2026-01-18', '2026-01-22']
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function esFinDeSemana(fecha) {
        const dia = new Date(fecha).getDay();
        return dia === 0 || dia === 6; // domingo o sábado
    }

    function tieneDisponibilidad(especialidad, fecha) {
        const fechas = disponibilidad[especialidad] || [];
        return fechas.includes(fecha);
    }

    function procesarCita() {
        const nombre = nombreInput.value.trim();
        const especialidad = especialidadInput.value;
        const fecha = fechaInput.value;

        if (!nombre) {
            mostrarMensaje('Ingrese el nombre del paciente.', 'warning');
            return;
        }

        if (!especialidad) {
            mostrarMensaje('Seleccione una especialidad.', 'warning');
            return;
        }

        if (!fecha) {
            mostrarMensaje('Seleccione una fecha.', 'warning');
            return;
        }

        if (esFinDeSemana(fecha)) {
            mostrarMensaje('No se atienden citas los fines de semana.', 'danger');
            return;
        }

        if (!tieneDisponibilidad(especialidad, fecha)) {
            mostrarMensaje('El profesional no tiene disponibilidad en esa fecha.', 'danger');
            return;
        }

        mostrarMensaje(`Cita reservada para ${nombre} en ${especialidad} el ${fecha}.`, 'success');

        nombreInput.value = '';
        especialidadInput.value = '';
        fechaInput.value = '';
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarCita();
    });

})();
