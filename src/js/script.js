
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


function obtenerProducto(id) {
    const productos = {
        1: { id: 1, nombre: "Laptop Gamer", precio: 4500 },
        2: { id: 2, nombre: "Teclado Mecánico", precio: 250 },
        3: { id: 3, nombre: "Mouse RGB", precio: 120 },
        4: { id: 4, nombre: "Audífonos Bluetooth", precio: 180 },
        5: { id: 5, nombre: "Tablet Pro 10\"", precio: 980 },
        6: { id: 6, nombre: "Smartwatch Fit", precio: 260 }
    };

    return productos[id];
}


function agregarCarrito(id) {
    let producto = obtenerProducto(id);
    if (!producto) return;

    let existe = carrito.find(item => item.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert("Producto agregado: " + producto.nombre);
}



function mostrarCarrito() {
    let tabla = document.getElementById("cart-items");
    let totalTexto = document.getElementById("cart-total");

    if (!tabla) return;

    tabla.innerHTML = "";
    let totalGeneral = 0;

    carrito.forEach((item, index) => {
        let totalProducto = item.precio * item.cantidad;
        totalGeneral += totalProducto;

        tabla.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>S/. ${item.precio}</td>
                <td>
                    <input type="number" min="1" value="${item.cantidad}"
                        onchange="cambiarCantidad(${index}, this.value)"
                        class="form-control" style="width:80px;">
                </td>
                <td>S/. ${totalProducto}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminar(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>`;
    });

    totalTexto.textContent = totalGeneral;
}


function cambiarCantidad(index, valor) {
    valor = parseInt(valor);
    if (valor < 1) valor = 1;
    carrito[index].cantidad = valor;

   
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}


function eliminar(index) {
    carrito.splice(index, 1);

   
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
}


if (document.getElementById("cart-items")) {
    mostrarCarrito();
}
