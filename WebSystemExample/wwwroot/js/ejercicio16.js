(() => {
    const btn = document.getElementById('btnEvaluar');
    const resultado = document.getElementById('resultadoEvaluacion');

    const calcularPromedio = (notas) => {
        const suma = notas.reduce((acc, nota) => acc + nota, 0);
        return suma / notas.length;
    };

    const obtenerCategoria = (promedio) => {
        if (promedio >= 18) return { texto: 'Sobresaliente', color: 'success' };
        if (promedio >= 14) return { texto: 'Bueno', color: 'info' };
        if (promedio >= 11) return { texto: 'Regular', color: 'warning' };
        return { texto: 'Deficiente', color: 'danger' };
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }

    function procesarEvaluacion() {
        const n1 = parseFloat(document.getElementById('puntosEquipo').value);
        const n2 = parseFloat(document.getElementById('puntosPuntualidad').value);
        const n3 = parseFloat(document.getElementById('puntosProductividad').value);
        const n4 = parseFloat(document.getElementById('puntosComunicacion').value);

        const notas = [n1, n2, n3, n4];

        const hayError = notas.some(n => isNaN(n) || n < 0 || n > 20);

        if (hayError) {
            mostrarMensaje('Por favor, ingresa todas las notas (valores entre 0 y 20).', 'warning');
            return;
        }

        const promedio = calcularPromedio(notas);
        const evaluacion = obtenerCategoria(promedio);

        mostrarMensaje(`
            <strong>Resultado del Desempeño:</strong><br>
            Promedio Final: <strong>${promedio.toFixed(2)}</strong><br>
            Estado: <span class="badge bg-${evaluacion.color}">${evaluacion.texto}</span>
        `, evaluacion.color);
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarEvaluacion();
        });
    }
})();