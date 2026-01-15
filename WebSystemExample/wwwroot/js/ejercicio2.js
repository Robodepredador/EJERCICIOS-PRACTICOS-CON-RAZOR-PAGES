(() => {
    function getByIds(...ids) {
        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) return el;
        }
        return null;
    }

    const form = getByIds('formAgregarProductos');
    const nombreInput = getByIds('nombreInput');
    const precioInput = getByIds('precioInput');
    const cantidadInput = getByIds('cantidadInput');
    const tablaBody = document.querySelector('#tablaPedido tbody') || document.querySelector('table#tablaPedido tbody');
    const resultadoDiv = getByIds('resultados');

    const IGV = 0.18;
    let productos = [];
    let siguienteId = 1;

    function formatearMoneda(numero) {
        return Number(numero).toFixed(2);
    }

    function calcularTotales() {
        const subtotal = productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        const igv = subtotal * IGV;
        const total = subtotal + igv;
        return { subtotal, igv, total };
    }

    function renderizarResultados() {
        const { subtotal, igv, total } = calcularTotales();
        resultadoDiv.innerHTML = `
        <div><strong>Subtotal:</strong> S/ ${formatearMoneda(subtotal)}</div>
        <div><strong>IGV (18%):</strong> S/ ${formatearMoneda(igv)}</div>
        <div><strong>Total:</strong> S/ ${formatearMoneda(total)}</div>
        `;
    }

    function renderizarTabla() {
        console.log('Ejercicio2.renderizarTabla: productos.length=', productos.length);
        if (productos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="5" class="text-center">No hay productos agregados.</td></tr>';
            resultadoDiv.innerHTML = '';
            return;
        }

        tablaBody.innerHTML = productos.map(prod => `
            <tr data-id="${prod.id}">
                <td>${escapeHtml(prod.nombre)}</td>
                <td>S/ ${formatearMoneda(prod.precio)}</td>
                <td>${prod.cantidad}</td>
                <td>S/ ${formatearMoneda(prod.precio * prod.cantidad)}</td>
                <td><button type="button" class="btn btn-danger btn-sm btn-eliminar" data-id="${prod.id}">Eliminar</button></td>
            </tr>
        `).join('');

        renderizarResultados();
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function agregarProducto(nombre, precio, cantidad) {
        productos.push({ id: siguienteId++, nombre, precio, cantidad });
        persistirProductos();
        console.log('Ejercicio2.agregarProducto: agregado', productos[productos.length - 1]);
        renderizarTabla();
    }

    function eliminarProducto(id) {
        productos = productos.filter(prod => prod.id !== id);
        persistirProductos();
        renderizarTabla();
    }

    function persistirProductos() {
        try {
            localStorage.setItem('carrito_productos', JSON.stringify(productos));
            localStorage.setItem('carrito_siguienteId', String(siguienteId));
        } catch (e) {
        }
    }

    function restaurarProductos() {
        try {
            const saved = localStorage.getItem('carrito_productos');
            const savedId = localStorage.getItem('carrito_siguienteId');
            if (saved) {
                productos = JSON.parse(saved).map(p => ({
                    id: Number(p.id),
                    nombre: String(p.nombre),
                    precio: Number(p.precio),
                    cantidad: Number(p.cantidad)
                }));
            }
            if (savedId) {
                siguienteId = Number(savedId) || siguienteId;
            }
        } catch (e) {
            productos = [];
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Ejercicio2.submit: evento submit capturado');

        const nombre = nombreInput.value.trim();
        const precio = parseFloat(precioInput.value);
        const cantidad = parseInt(cantidadInput.value, 10);

        console.log('Ejercicio2.submit: valores', { nombre, precio, cantidad });

        if (!nombre) {
            alert('El nombre del producto es obligatorio.');
            nombreInput.focus();
            return;
        }
        if (!Number.isFinite(precio) || precio <= 0) {
            alert('El precio debe ser un número positivo.');
            precioInput.focus();
            return;
        }
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            alert('La cantidad debe ser un entero positivo.');
            cantidadInput.focus();
            return;
        }
        agregarProducto(nombre, precio, cantidad);

        nombreInput.value = '';
        precioInput.value = '';
        cantidadInput.value = '';
        nombreInput.focus();
    });

    tablaBody.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-eliminar');
        if (!btn) return;
        const id = Number(btn.dataset.id);
        if (Number.isFinite(id)) {
            eliminarProducto(id);
        }
    });

    restaurarProductos();
    renderizarTabla();
})();