(() => {

    const notaInput = document.getElementById('notaInput');
    const minimoInput = document.getElementById('minimoInput');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnCalcular = document.getElementById('btnCalcular');
    const listaNotas = document.getElementById('listaNotas');
    const resultado = document.getElementById('resultadoPromedio');

    let notas = [];

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function renderizarNotas() {
        listaNotas.innerHTML = '';
        notas.forEach(n => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = n;
            listaNotas.appendChild(li);
        });
    }

    function agregarNota() {
        const nota = parseFloat(notaInput.value);

        if (!Number.isFinite(nota) || nota < 0 || nota > 20) {
            mostrarMensaje('Ingrese una nota válida entre 0 y 20.', 'warning');
            return;
        }

        notas.push(nota);
        renderizarNotas();
        notaInput.value = '';
    }

    function calcularPromedio() {
        if (notas.length === 0) {
            mostrarMensaje('Ingrese al menos una nota.', 'warning');
            return;
        }

        const minimo = parseFloat(minimoInput.value);

        const suma = notas.reduce((a, b) => a + b, 0);
        const promedio = suma / notas.length;

        if (promedio >= minimo) {
            mostrarMensaje(`Promedio: ${promedio.toFixed(2)} - Aprobado`, 'success');
        } else {
            mostrarMensaje(`Promedio: ${promedio.toFixed(2)} - Desaprobado`, 'danger');
        }
    }

    btnAgregar.addEventListener('click', e => {
        e.preventDefault();
        agregarNota();
    });

    btnCalcular.addEventListener('click', e => {
        e.preventDefault();
        calcularPromedio();
    });

})();
