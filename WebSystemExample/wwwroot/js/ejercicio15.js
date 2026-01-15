(() => {
    const salidaInput = document.getElementById('salidaInput');
    const llegadaInput = document.getElementById('llegadaInput');
    const btn = document.getElementById('btnPlanificar');
    const resultado = document.getElementById('resultadoRuta');

    const calcularDuracion = (distanciaKm) => {
        const velocidadPromedio = 30; 
        const tiempoHoras = distanciaKm / velocidadPromedio;
        return Math.round(tiempoHoras * 60); 
    };


    const simularDistancia = (str1, str2) => {
        const semilla = str1.length + str2.length;
        return (semilla % 18) + 2;
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }

    function procesarRuta() {
        const salida = salidaInput.value.trim();
        const llegada = llegadaInput.value.trim();

        if (salida === '' || llegada === '') {
            mostrarMensaje('Por favor, ingresa ambas direcciones.', 'warning');
            return;
        }

        if (salida.toLowerCase() === llegada.toLowerCase()) {
            mostrarMensaje('La salida y llegada no pueden ser iguales.', 'warning');
            return;
        }

        const distancia = simularDistancia(salida, llegada);

        const minutos = calcularDuracion(distancia);

        mostrarMensaje(`
            <strong>Ruta Planificada:</strong><br>
            De: ${salida}<br>
            A: ${llegada}<br><br>
            Distancia estimada: <strong>${distancia} km</strong><br>
            Tiempo aprox: <strong>${minutos} minutos</strong>
        `, 'primary');
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarRuta();
        });
    }
})();