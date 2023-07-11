import { AVAILABLE_PROD } from "./prodotti.js";

export let Cart = {
    /**Creo un oggetto javascript per gestire gli elementi del carrello */
   
    _products: [],
    //array per tenere traccia dei prodotti nel carrello
    //attributo privato dell'oggetto si interagisce tramite i metodi.
    
    addProduct: function (id) {
        //funzione per aggiungere un prodotto nell'array, filtrandolo per id
        let ins = AVAILABLE_PROD.filter(p => p.id === id)[0];
        console.log(ins);
        this._products.push(ins);
        this.updateCart();
    },
    
    removeProduct: function (id) {
        //elimina dall'array un prodotto dato il suo id
        let i = -1;
        this._products.forEach((p, index) => {
            console.log("remove prod", "\nprodotto: ", p, "indice", index)
            if(p.id === id) i = index;
        });
    
        if(i === -1){
            console.warn("errore elemento non trovato");
        }
        else {
            console.log("indice", i, "prodotto:", this._products[i]);
            this._products = this._products.splice(i, 1);
            console.log("Elementi ancora nel carrello: ", this._products);
        }
        this.updateCart();
    },
    
    getCartItems: function () {
        //ritorna il numero di oggetti nel carrello
        console.log(this._products.length);
        return this._products.length;
    },

    getTotalCart: function () {
        //ritorna il totale della spesa
        let tot = 0;
        this._products.forEach(p => {
            //applico lo sconto se c'è la promozione
            if(p.promo) tot += (p.price * (1 - p.discount / 100));
            else tot += p.promo;
        })
        return tot;
    },


    //----------------------------Elementi HTML-----------------------------------------
    _getCartElement: function () {
        //ritorna elemento html con icona carrello
        //metodo privato serve solo ad altri metodi dell'oggetto
        const el = document.createElement('div');
        el.setAttribute('class', 'cart');
        el.style.backgroundColor = '#fcf4ad;'
        const icon = document.createElement('img');
        icon.src = '../utils/cart.png';
        icon.width = 20;
        icon.height = 20;
        el.append(icon);
        return el;
    },

    getTopElement: function () {
        //ritorna elemento html carrello che riporta il numero oggetti inseriti
        //cliccabile per entrare nella sezione carrello (da mettere nell'head)
        const stat = document.createElement('div');
        stat.id = "cart-num-index";
        stat.setAttribute("class", "status cart");
        stat.width = 7;
        stat.height = 7;
        stat.append(this.getTotalCart().toString());

        const cart = this._getCartElement();
        cart.id = "top-cart-btn";
        cart.append(stat);
        cart.addEventListener("click", () => {
            if(this._products.length !== 0){
                console.log("Prodotti nell'array carrello:", this._products);
                this.showHideCart()
            }
        });
        return cart;
    },

    getCardElement: function (id) {
        //ritorna elemento html da inserire nelle card
        //passo l'id al momento della creazione dell'elemento per 
        //poter inserire agevolmente il prodotto nell'array
        const cart = this._getCartElement();
        cart.id = `add-${id}`
        cart.addEventListener("click", () => {
            this.addProduct(id);
            console.log("Array dopo insert:", this._products);
            document.getElementById("cart-num-index").innerHTML = 
                this.getCartItems().toString();
                this.updateCart()
        });
        return cart;
    },

    cartContainer: function () {
        //elemento principale
        const contEL = document.createElement('div');
        contEL.classList.add("cart-container", "hidden-cart");

        //elemento per contenere la lista
        const cartEl = document.createElement("ul");
        cartEl.classList.add("cart-list", "cart");

        //creo array di elementi prodotto
        let liProd = this._products.map(el => {
            let item = document.createElement('li');
            item.classList.add("cart-item");
            item.append(document.createTextNode(
                `prodotto: ${el.id} ↦ ${el.promo ? 
                    (el.price * (1 - el.discount / 100)).toFixed(2) : 
                    el.price.toFixed(2)}\nMarca: ${el.brand},Prodotto: ${el.model}`));
            console.log("elemento creato nel map",item);
            return item;
        });
        cartEl.append(...liProd);
        contEL.append(cartEl);
        return contEL;
    },

    updateCart: function() {
        const element = document.querySelector(".cart-container");
        if(element !== null){
            document.body.removeChild(element);
        }
        document.body.append(this.cartContainer());
    },

    showHideCart: function () {
        const element = document.querySelector(".cart-container");
        element.classList.toggle("hidden-cart");
    },


}