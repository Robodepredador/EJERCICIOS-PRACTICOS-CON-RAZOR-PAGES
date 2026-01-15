(() => {

    const fechaInput = document.getElementById('fechaInput');
    const asistenciaInput = document.getElementById('asistenciaInput');
    const btn = document.getElementById('btnRegistrar');
    const lista = document.getElementById('listaAsistencia');
    const resultado = document.getElementById('resultadoAsistencia');

    let asistencias = [];

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function renderizar() {
        lista.innerHTML = '';
        asistencias.forEach(a => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${a.fecha} - ${a.asistio ? 'Asistió' : 'No asistió'}`;
            lista.appendChild(li);
        });
    }

    function calcularPorcentaje() {
        if (asistencias.length === 0) return 0;
        const presentes = asistencias.filter(a => a.asistio).length;
        return (presentes / asistencias.length) * 100;
    }

    function registrarAsistencia() {
        const fecha = fechaInput.value;
        const asistio = asistenciaInput.value;

        if (!fecha) {
            mostrarMensaje('Seleccione una fecha.', 'warning');
            return;
        }

        if (!asistio) {
            mostrarMensaje('Seleccione si asistió o no.', 'warning');
            return;
        }

        asistencias.push({
            fecha,
            asistio: asistio === 'si'
        });

        renderizar();

        const porcentaje = calcularPorcentaje();

        mostrarMensaje(`Porcentaje de asistencia: ${porcentaje.toFixed(2)}%`, 'success');

        fechaInput.value = '';
        asistenciaInput.value = '';
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        registrarAsistencia();
    });

})();
