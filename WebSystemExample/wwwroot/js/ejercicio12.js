(() => {

    const nombreInput = document.getElementById('nombreInput');
    const promedioInput = document.getElementById('promedioInput');
    const ingresosInput = document.getElementById('ingresosInput');
    const btn = document.getElementById('btnEvaluar');
    const resultado = document.getElementById('resultadoBeca');

    const PROMEDIO_MINIMO = 14;
    const INGRESO_MAXIMO = 1500;

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function evaluarBeca(promedio, ingresos) {
        return promedio >= PROMEDIO_MINIMO && ingresos <= INGRESO_MAXIMO;
    }

    function procesarEvaluacion() {
        const nombre = nombreInput.value.trim();
        const promedio = parseFloat(promedioInput.value);
        const ingresos = parseFloat(ingresosInput.value);

        if (!nombre) {
            mostrarMensaje('Ingrese el nombre del estudiante.', 'warning');
            return;
        }

        if (!Number.isFinite(promedio) || promedio < 0 || promedio > 20) {
            mostrarMensaje('Ingrese un promedio válido.', 'warning');
            return;
        }

        if (!Number.isFinite(ingresos) || ingresos < 0) {
            mostrarMensaje('Ingrese ingresos válidos.', 'warning');
            return;
        }

        if (evaluarBeca(promedio, ingresos)) {
            mostrarMensaje(`${nombre} califica para la beca.`, 'success');
        } else {
            mostrarMensaje(`${nombre} no cumple los requisitos para la beca.`, 'danger');
        }
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        procesarEvaluacion();
    });

})();
