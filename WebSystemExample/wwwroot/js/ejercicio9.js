(() => {

    const nombreInput = document.getElementById('nombreInput');
    const carreraInput = document.getElementById('carreraInput');
    const turnoInput = document.getElementById('turnoInput');
    const correoInput = document.getElementById('correoInput');
    const btn = document.getElementById('btnInscribir');
    const resultado = document.getElementById('resultadoInscripcion');

    const cupos = {
        'Mañana': 2,
        'Tarde': 2,
        'Noche': 2
    };

    let inscritos = [];

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function correoValido(correo) {
        return /\S+@\S+\.\S+/.test(correo);
    }

    function existeCorreo(correo) {
        return inscritos.some(i => i.correo === correo);
    }

    function procesarInscripcion() {
        const nombre = nombreInput.value.trim();
        const carrera = carreraInput.value;
        const turno = turnoInput.value;
        const correo = correoInput.value.trim();

        if (!nombre) {
            mostrarMensaje('Ingrese el nombre.', 'warning');
            return;
        }

        if (!carrera) {
            mostrarMensaje('Seleccione una carrera.', 'warning');
            return;
        }

        if (!turno) {
            mostrarMensaje('Seleccione un turno.', 'warning');
            return;
        }

        if (!correo || !correoValido(correo)) {
            mostrarMensaje('Ingrese un correo válido.', 'warning');
            return;
        }

        if (existeCorreo(correo)) {
            mostrarMensaje('Este correo ya está registrado.', 'danger');
            return;
        }

        if (cupos[turno] <= 0) {
            mostrarMensaje('No hay cupos disponibles para ese turno.', 'danger');
            return;
        }

        inscritos.push({ nombre, carrera, turno, correo });
        cupos[turno]--;

        mostrarMensaje('Inscripción realizada correctamente.', 'success');

        nombreInput.value = '';
        carreraInput.value = '';
        turnoInput.value = '';
        correoInput.value = '';
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarInscripcion();
    });

})();
