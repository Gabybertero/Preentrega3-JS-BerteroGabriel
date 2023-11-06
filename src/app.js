const btnCart = document.querySelector(".container-cart-icon")
const containerCartProducts = document.querySelector('.container-cart-products')
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items')

// Variable de arreglos de productos
let allProducts = []

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')



productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        }

        const exist = allProducts.some(product => product.title === infoProduct.title)

        if (exist) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product
                } else {
                    return product
                }
            })
            allProducts = [...products]
        } else {
            allProducts = [...allProducts, infoProduct]
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', (e) => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter(product => product.title !== title)
    }

    console.log(allProducts);
    showHTML()
})


const showHTML = () => {

    if(!allProducts.length){
        containerCartProducts.innerHTML=`
            <p class="cart-empty">El carrito está vacío</p>
        `
    }

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
        <div class="cart-product">
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-prodcto-carrito">${product.price}</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `

        rowProduct.append(containerProduct)

        total = total + parseInt(product.quantity * product.price.slice(1))
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`
    countProducts.innerText = totalOfProducts;
}

let nombreUsuario;
let apellidoUsuario;
let encuestaNike;

while (true) {
    nombreUsuario = prompt("Ingrese su Nombre");
    apellidoUsuario = prompt("Ingrese su Apellido");

    if (nombreUsuario !== "" && apellidoUsuario !== "") {
        console.log("Nombre: " + nombreUsuario + " Apellido: " + apellidoUsuario);
    } else {
        alert("Todos los campos son obligatorios");
        continue;
    }

    while (true) {

        alert("Hola " + nombreUsuario + " " + apellidoUsuario + "! Deseamos conocer más sobre ti, así que te invitamos a participar en una encuesta rápida.")

        encuestaNike = prompt(`De estas tres alternativas de Nike, ¿cuál te gusta más? (Conteste según la enumeración establecida):
        1: Nike Dunk Low ~ Naranja
        2: Nike Curt Vision Low ~ Negro
        3: Nike Air Force 1 ~ Blanco
        `);

        switch (encuestaNike) {
            case "1":
                console.log("Nike Dunk Low ~ Naranja");
                break;
            case "2":
                console.log("Nike Curt Vision Low ~ Negro");
                break;
            case "3":
                console.log("Nike Air Force 1 ~ Blanco");
                break;
            default:
                alert("Respuesta no válida. Por favor, elija 1, 2 o 3.");
                continue;
        }
        const datosEncuesta = {
            nombre: nombreUsuario,
            apellido: apellidoUsuario,
            respuestaEncuesta: encuestaNike,
        };
        localStorage.setItem('datosEncuesta', JSON.stringify(datosEncuesta));
        break
    }

    const repetirEncuesta = confirm("¿Deseas repetir la encuesta? (En el caso que desee repetir la encuesta seleccione aceptar)");
    if (!repetirEncuesta) {
        break;
    } else {
        alert("Todos los campos son obligatorios");
    }
}

window.addEventListener('load', function () {
    const datosGuardados = localStorage.getItem('datosEncuesta');
    if (datosGuardados) {
        const datosEncuesta = JSON.parse(datosGuardados);
        console.log("Nombre: " + datosEncuesta.nombre + " Apellido: " + datosEncuesta.apellido);
        console.log("Respuesta de la encuesta: " + datosEncuesta.respuestaEncuesta);
    }

    function calcularTalle() {
        var seleccion = document.getElementById("talle");
        var tallaSeleccionada = seleccion.options[seleccion.selectedIndex].value;

        document.getElementById("resultadoTalle").textContent = tallaSeleccionada;
    }

    const botonCalcularEnvio = document.getElementById('calcularEnvio');

    // botonCalcularEnvio.addEventListener('click', function() {
    //     const precio = parseFloat(prompt('Por favor, ingresa el valor del par:'));
    //     const talle = prompt('Por favor, ingrese su talle');

    //     const tarifasEnvio = {
    //         1000: 500,
    //         1200: 550,
    //         1500: 600,
    //         1700: 650,
    //         1800: 700,
    //         2000: 750,
    //     };

    //     function calcularTarifaEnvio(precio) {
    //         for (const rango in tarifasEnvio) {
    //             if (precio <= parseFloat(rango)) {
    //                 return tarifasEnvio[rango];
    //             }
    //         }
    //         return 'No se encontró tarifa de envío para este precio.';
    //     }

    //     const tarifaEnvio = calcularTarifaEnvio(precio);

    //     if (tarifaEnvio !== undefined) {
    //         const precioFinal = precio + tarifaEnvio;
    //         alert(`Precio: $${precio}\nTalle: ${talle}\nTarifa de Envío: $${tarifaEnvio}\nPrecio Final: $${precioFinal}`);
    //     } else {
    //         alert('Por favor, ingresa un precio válido.');
    //     }
    // });

    const calcularTarifaEnvio = (precio) => {
        const tarifasEnvio = {
            1000: 500,
            1200: 550,
            1500: 600,
            1700: 650,
            1800: 700,
            2000: 750,
        };

        for (const rango in tarifasEnvio) {
            if (precio <= parseFloat(rango)) {
                return tarifasEnvio[rango];
            }
        }
        return null;
    };
    const calcularEnvioButton = document.getElementById('calcularEnvioButton');
    const resultado = document.getElementById('resultado');

    calcularEnvioButton.addEventListener('click', () => {
        const precioInput = document.getElementById('precioInput');
        const talleInput = document.getElementById('talleInput');

        const precio = parseFloat(precioInput.value);
        const talle = talleInput.value;

        if (!isNaN(precio) && precio >= 0) {
            const tarifaEnvio = calcularTarifaEnvio(precio);
            if (tarifaEnvio !== null) {
                const precioFinal = precio + tarifaEnvio;
                resultado.textContent = `Precio: $${precio}\nTalle: ${talle}\nTarifa de Envío: $${tarifaEnvio}\nPrecio Final: $${precioFinal}`;
            } else {
                resultado.textContent = 'No se encontró tarifa de envío para este precio.';
            }
        } else {
            resultado.textContent = 'Por favor, ingrese un precio válido.';
        }
    })
});