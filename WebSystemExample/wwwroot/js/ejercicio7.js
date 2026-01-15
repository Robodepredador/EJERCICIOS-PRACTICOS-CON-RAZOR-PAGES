(() => {

    const sintomaInput = document.getElementById('sintomaInput');
    const fechaInput = document.getElementById('fechaInput');
    const btn = document.getElementById('btnAgregar');
    const lista = document.getElementById('listaHistorial');
    const resultado = document.getElementById('resultadoSintomas');

    const STORAGE_KEY = 'historial_sintomas';

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function obtenerHistorial() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function guardarHistorial(historial) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
    }

    function renderizarHistorial() {
        const historial = obtenerHistorial();
        lista.innerHTML = '';

        historial.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${item.fecha} - ${item.sintoma}`;
            lista.appendChild(li);
        });
    }

    function agregarSintoma() {
        const sintoma = sintomaInput.value.trim();
        const fecha = fechaInput.value;

        if (!sintoma) {
            mostrarMensaje('Ingrese un síntoma.', 'warning');
            return;
        }

        if (!fecha) {
            mostrarMensaje('Seleccione una fecha.', 'warning');
            return;
        }

        const historial = obtenerHistorial();

        historial.push({ sintoma, fecha });

        guardarHistorial(historial);
        renderizarHistorial();

        mostrarMensaje('Síntoma agregado correctamente.', 'success');

        sintomaInput.value = '';
        fechaInput.value = '';
    }

    btn.addEventListener('click', e => {
        e.preventDefault();
        agregarSintoma();
    });

    renderizarHistorial();

})();
