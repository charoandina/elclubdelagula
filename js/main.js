//  PRODUCTOS
const productos = [
    // Chocolates
    {
        id: "kinder-bueno",
        titulo: "Kinder Bueno",
        imagen: "./img/chocolates/kinderbueno.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 435
    },    
    {
        id: "kinder-bueno-blanco",
        titulo: "Kinder Bueno B",
        imagen: "./img/chocolates/kinderbuenoblanco.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 450
    },
    {
        id: "milka-caramel",
        titulo: "Milka Caramel",
        imagen: "./img/chocolates/milkacaramel.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 320
    },
    {
        id: "milka-chipsahoy",
        titulo: "Milka Chips Ahoy",
        imagen: "./img/chocolates/milkachipsahoy.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 310
    },
    {
        id: "milka-oreo",
        titulo: "Milka Oreo",
        imagen: "./img/chocolates/milkaoreo.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 300
    },
    {
        id: "milka-leche",
        titulo: "Milka con leche",
        imagen: "./img/chocolates/milkaleche.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 250
    },
    {
        id: "kit-kat",
        titulo: "Kit-Kat",
        imagen: "./img/chocolates/kitkat.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 220
    },
    {
        id: "kit-kat-blanco",
        titulo: "Kit-Kat Blanco",
        imagen: "./img/chocolates/kitkatblanco.png",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates",
        },
        precio: 260
    },
    // Bebidas
    {
        id: "coca-cola",
        titulo: "Coca Cola",
        imagen: "./img/bebidas/coca.png",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 80
    },
    {
        id: "coca-cola-zero",
        titulo: "Coca Cola Zero",
        imagen: "./img/bebidas/cocazero.png",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 82
    },
    {
        id: "coca-cola-zero-zero",
        titulo: "Coca Cola Zero Z",
        imagen: "./img/bebidas/cocazerozero.png",
        categoria: {
            nombre: "Bebidas",
            id: "bebidas",
        },
        precio: 90
    },
    // Snacks
    {
        id: "pringles",
        titulo: "Pringles",
        imagen: "./img/snacks/pringles.png",
        categoria: {
            nombre: "Snacks",
            id: "snacks",
        },
        precio: 120
    },
    {
        id: "pringles-sour-cream",
        titulo: "Pringles Sour Cream",
        imagen: "./img/snacks/pringlescream.png",
        categoria: {
            nombre: "Snacks",
            id: "snacks",
        },
        precio: 140
    },
    {
        id: "pringles-spicy",
        titulo: "Pringles Hot & Spicy",
        imagen: "./img/snacks/pringlesspicy.png",
        categoria: {
            nombre: "Snacks",
            id: "snacks",
        },
        precio: 150
    },
];

const contenedorProductos = document.querySelector ("#contenedor-productos");
const botonesCategorias = document.querySelectorAll (".boton-categoria");
const tituloPrincipal = document.querySelector ("#titulo-principal");
let botonesAgregar = document.querySelectorAll (".producto-agregar");
const numerito = document.querySelector ("#numerito");


function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-img">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        ` ;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar ();
}

cargarProductos (productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener ("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos (productosBoton);
    } else {
        tituloPrincipal.innerText = "Todos los productos"
        cargarProductos(productos);
    }

    })
});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll (".producto-agregar");

    botonesAgregar.forEach (boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}



function agregarAlCarrito (e) {
    
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push (productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}