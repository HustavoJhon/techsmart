let carrito = [];
let botones = document.querySelectorAll(".agregar");
let listaCarrito = document.querySelector(".lista-carrito");
let totalTexto = document.querySelector(".total");
let contador = document.querySelector(".contador");

let vistaProductos = document.querySelector(".productos");
let vistaCarrito = document.querySelector(".carrito");

let irInicio = document.querySelector(".ir-inicio");
let irCarrito = document.querySelector(".ir-carrito");
let iconoCarrito = document.querySelector(".icono-carrito");

let tags = document.querySelectorAll(".tag");
let productos = document.querySelectorAll(".producto");

botones.forEach(boton => {
    boton.addEventListener("click", function() {
        let nombre = this.parentElement.querySelector("h2").textContent;
        let precio = Number(this.parentElement.querySelector(".precio").textContent.replace("S/ ", ""));
        agregarCarrito(nombre, precio);
        mostrarCarrito();
        actualizarContador();
    });
});

function agregarCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
}

function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        let li = document.createElement("li");
        li.textContent = producto.nombre + " - S/ " + producto.precio;
        listaCarrito.appendChild(li);
        total += producto.precio;
    });

    totalTexto.textContent = "Total: S/ " + total;
}

function actualizarContador() {
    contador.textContent = carrito.length;
}

function mostrarVistaProductos() {
    vistaProductos.classList.replace("vista-oculta", "vista-activa");
    vistaCarrito.classList.replace("vista-activa", "vista-oculta");
}

function mostrarVistaCarrito() {
    vistaCarrito.classList.replace("vista-oculta", "vista-activa");
    vistaProductos.classList.replace("vista-activa", "vista-oculta");
}

irInicio.addEventListener("click", mostrarVistaProductos);
irCarrito.addEventListener("click", mostrarVistaCarrito);
iconoCarrito.addEventListener("click", mostrarVistaCarrito);

tags.forEach(tag => {
    tag.addEventListener("click", () => {
        tags.forEach(t => t.classList.remove("activo"));
        tag.classList.add("activo");

        let categoria = tag.dataset.cat;

        productos.forEach(prod => {
            if (categoria === "todo" || prod.dataset.cat === categoria) {
                prod.style.display = "block";
            } else {
                prod.style.display = "none";
            }
        });
    });
});
