import {products} from "./src/js/data.js";
const conteinerStoreCards = document.querySelector(".conteiner__store__cards")
const contentCartBody = document.querySelector(".aside__cart-body")
const conteinerCategorias = document.querySelector(".conteiner__categorias")
let cart = {}

function printProducts() {

    let html = ""

products.forEach(({id, nombre, precio, imagen, stock}) => {
    html += ` 
    <div class="conteiner__store__card__products">
    <div class="conteiner__store__card__products-img">
        <img src="${imagen}" alt="${nombre}">
    </div>
    <div class="conteiner__store__card__products-boddy" id="${id}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${stock} in Stock</p>
        <button class="btn__add">Comprar</i></button>
    </div>
</div>
    
    `

})

conteinerStoreCards.innerHTML = html;
    
}

printProducts()



const iconCart = document.querySelector("#iconCart")
const contenCart = document.querySelector("#contenCart")



iconCart.addEventListener('click', (e) => {
    contenCart.classList.toggle("aside__cart-show")


})


function printProductInCart() {

    let html = "";
    const arrayCart = Object.values(cart);
    const total = document.querySelector("#total")
    const productsTotal = document.querySelector("#productsTotal")
    let contCart = 0;
    let sumTotal = 0;

    arrayCart.forEach(({id, nombre, imagen, amount, precio}) => {
        

        html += `
        <div class="item__cart">
            <div class="item__cart-img">
                <img src="${imagen}" alt="${nombre}">
            </div>

            <h4 class="item__cart-title">"${nombre}"</h4>
            <div class="item__cart-options" id="${id}">
                <i class='bx bx-minus'></i>
                <span id="amount">"${amount}</span>
                <i class='bx bx-plus' ></i>
                <i class='bx bx-trash-alt'></i>
            </div>
        </div>
        `
        sumTotal += amount*precio

        contCart += amount;

               
    });

    contentCartBody.innerHTML = html;

    total.textContent = sumTotal;
    productsTotal.textContent = contCart;
       
}


conteinerStoreCards.addEventListener('click', (e) =>{

    if (e.target.classList.contains("btn__add")) {
      const idProduct = +e.target.parentElement.id;

        const findProduct = products.find((item) => item.id === idProduct);

        if (cart[idProduct] && cart[idProduct].amount < cart[idProduct].stock) {
            cart[idProduct].amount++;
        } else if (!cart[idProduct]) {
            cart[idProduct] = findProduct;
            cart[idProduct].amount = 1
        }

        printProductInCart()
    }

})

contentCartBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-minus"))   {
        const idProduct = +e.target.parentElement.id;
        
        
        if (cart[idProduct].amount > 1) {
            cart[idProduct].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const idProduct = +e.target.parentElement.id;

        if (cart[idProduct].amount < cart[idProduct].stock) {
            cart[idProduct].amount++;
        }
        

    }

    if (e.target.classList.contains("bx-trash-alt")) {
        const idProduct = +e.target.parentElement.id;

        delete cart[idProduct];
    }

    printProductInCart()
});

// Categorias

function printCategory(brand) {

    let html = ""

products.forEach(({id, nombre, precio, imagen, stock, marca}) => {
    if (brand === marca) {

        html += ` 
    <div class="conteiner__store__card__products">
    <div class="conteiner__store__card__products-img">
        <img src="${imagen}" alt="${nombre}">
    </div>
    <div class="conteiner__store__card__products-boddy" id="${id}">
        <h3>${nombre}</h3>
        <p>$${precio}</p>
        <p>${stock} in Stock</p>
        <button class="btn__add">Comprar</i></button>
    </div>
</div>
    
    `     
    }
})

conteinerStoreCards.innerHTML = html;

  
}


conteinerCategorias.addEventListener("click", (e) => {

   if (e.target.classList.contains("dell")) {
         printCategory("dell")
   }

   if (e.target.classList.contains("hp")) {
        printCategory("hp")
   }

   if (e.target.classList.contains("verTodo")) {
        printProducts()
   }

   if (e.target.classList.contains("asus")) {

        printCategory("asus")
}

if (e.target.classList.contains("acer")) {
        printCategory("acer")
}

});

