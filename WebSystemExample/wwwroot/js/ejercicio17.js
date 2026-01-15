(() => {
    const btn = document.getElementById('btnCalcularSueldo');
    const resultado = document.getElementById('resultadoSueldo');

    const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

    const calcularPagoExtras = (horas) => horas * 20;

    const calcularImpuestoRenta = (sueldoBruto) => {
        if (sueldoBruto <= 2500) return 0; 
        if (sueldoBruto <= 5000) return sueldoBruto * 0.08; 
        return sueldoBruto * 0.12; 
    };

    function mostrarMensaje(texto, tipo = 'info') {
        resultado.innerHTML = `<div class="alert alert-${tipo} mt-3" role="alert">
                                    ${texto}
                               </div>`;
    }
    function procesarSueldo() {
        const base = parseFloat(document.getElementById('sueldoBaseInput').value);
        const extras = parseFloat(document.getElementById('horasExtrasInput').value) || 0;
        const otrosDescuentos = parseFloat(document.getElementById('otrosDescuentosInput').value) || 0;

        if (isNaN(base) || base <= 0) {
            mostrarMensaje('Por favor, ingresa un sueldo base válido.', 'warning');
            return;
        }

        const pagoExtras = calcularPagoExtras(extras);
        const sueldoBruto = base + pagoExtras;

        const descuentoAFP = sueldoBruto * 0.12;

        const impuesto = calcularImpuestoRenta(sueldoBruto);

        const sueldoNeto = sueldoBruto - descuentoAFP - impuesto - otrosDescuentos;

        mostrarMensaje(`
            <div class="text-start">
                <strong>Resumen de Nómina:</strong><br>
                Sueldo Bruto: ${formatter.format(sueldoBruto)} <br>
                <hr>
                (-) AFP (12%): ${formatter.format(descuentoAFP)} <br>
                (-) Impuesto Renta: ${formatter.format(impuesto)} <br>
                (-) Otros: ${formatter.format(otrosDescuentos)} <br>
                <hr>
                <strong>Sueldo Neto: ${formatter.format(sueldoNeto)}</strong>
            </div>
        `, 'success');
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            procesarSueldo();
        });
    }
})();