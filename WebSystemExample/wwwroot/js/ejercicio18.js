(() => {
    const btn = document.getElementById('btnSolicitar');
    const resultado = document.getElementById('resultadoVacaciones');

    const obtenerDiasDisponibles = (tipo, años) => {
        if (tipo === 'Parcial') return 15; 
        if (años >= 10) return 30;
        if (años >= 5) return 22;
        return 15; 
    };

    const calcularDiasHabiles = (inicio, fin) => {
        let count = 0;
        let fechaActual = new Date(inicio);
        const fechaFin = new Date(fin);

        while (fechaActual <= fechaFin) {
            const diaSemana = fechaActual.getUTCDay(); 
            if (diaSemana !== 0 && diaSemana !== 6) {
                count++;
            }
            fechaActual.setUTCDate(fechaActual.getUTCDate() + 1);
        }
        return count;
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }

    function procesarVacaciones() {
        const fInicio = document.getElementById('fechaInicio').value;
        const fFin = document.getElementById('fechaFin').value;
        const contrato = document.getElementById('tipoContrato').value;
        const años = parseInt(document.getElementById('antiguedad').value);

        if (!fInicio || !fFin || !contrato || isNaN(años)) {
            mostrarMensaje('Por favor, complete todos los campos.', 'warning');
            return;
        }

        const dateInicio = new Date(fInicio);
        const dateFin = new Date(fFin);

        if (dateFin < dateInicio) {
            mostrarMensaje('La fecha de fin no puede ser anterior a la de inicio.', 'danger');
            return;
        }

        const disponibles = obtenerDiasDisponibles(contrato, años);

        const solicitados = calcularDiasHabiles(fInicio, fFin);

        if (solicitados > disponibles) {
            mostrarMensaje(`
                <strong>Solicitud Rechazada</strong><br>
                Has solicitado ${solicitados} días hábiles, pero solo tienes ${disponibles} disponibles por tu antigüedad.
            `, 'danger');
        } else {
            mostrarMensaje(`
                <strong>Solicitud Aprobada</strong><br>
                Días hábiles solicitados: ${solicitados}<br>
                Días restantes tras este periodo: ${disponibles - solicitados}
            `, 'success');
        }
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarVacaciones();
        });
    }
})();