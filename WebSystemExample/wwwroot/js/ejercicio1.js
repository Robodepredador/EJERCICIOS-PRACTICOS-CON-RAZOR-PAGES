// Ejercicio 1: Cálculo de precio con descuentos según tipo de cliente
// Evento para escuchar que todos los elemontos del DOM se hayan cargado
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded listener registrado');
    // Obtener referencias a los elementos del formulario
    const form = document.getElementById('formEjercicio1');
    // Elemento para mostrar el resultado
    const resultadoElement = document.getElementById('resultado');
    console.log('resultado:', resultadoElement);

   // Comprobaciones de seguridad
    if (!form) {
        console.error('No se encontró el formulario con id "formEjercicio1".');
        return;
    }
    if (!resultadoElement) {
        console.error('No se encontró el elemento con id "resultado".');
        return;
    }

    // Evento submit para manejar el envio de formulario cuando se hacer click en el boton Calcular
    form.addEventListener('submit', function (event) {
        // Evita que el formulario envie los datos y recargue la página
        event.preventDefault();
        // Limpiar el resultado previo
        resultadoElement.textContent = '';

        // Obtener los valores de los campos del formulario en forma de strings
        // Value obtiene los elementos ingresados en los inputs
        // Trim elimina espacios en blanco al inicio y al final
        const nombre = document.getElementById('nombreInput').value.trim();
        const precioRaw = document.getElementById('precioInput').value.trim();
        const cantidadRaw = document.getElementById('cantidadInput').value.trim();
        const clienteValue = document.getElementById('clienteSelect').value;

        // Convertir los valores de precio y cantidad a números
        // parseFloat convierte un string a un número decimal
        // parseInt convierte un string a un número entero
        const precio = parseFloat(precioRaw);
        const cantidad = parseInt(cantidadRaw, 10);

        // Validar los datos ingresados
        // Si no se ha ingresado un nombre
        if (!nombre) {
            resultadoElement.textContent = 'Por favor, ingrese su nombre.';
        }
        // Si no se ha ingresado un precio válido
        if (isNaN(precio) || precio <= 0) {
            resultadoElement.textContent += '\nPor favor, ingrese un precio válido mayor que 0.';
        }
        // Si no se ha ingresado una cantidad válida
        if (isNaN(cantidad) || cantidad <= 0) {
            resultadoElement.textContent += '\nPor favor, ingrese una cantidad válida mayor que 0.';
        }

        const total = calcularPrecio(precio, cantidad, clienteValue);
        const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
        resultadoElement.textContent = `Hola ${nombre}. Precio final: ${formatter.format(total)}.`  ;
    });

    function calcularPrecio(precio, cantidad, clienteValue) {
        let descuento = 0;
        // 10% de descuento para clientes mayoristas
        if (clienteValue === '2') {
            descuento = 0.10; 
        }
        // 20% de descuento para clientes VIP
        else if (clienteValue === '3') {
            descuento = 0.20; 
        }
        const precioTotal = precio * cantidad;
        const precioConDescuento = precioTotal * (1 - descuento);
        return precioConDescuento;
    }
}); 