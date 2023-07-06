import { AVAILABLE_PROD } from "./prodotti.js";

export let Cart = {
    /**Creo un oggetto javascript per gestire gli elementi del carrello */
   
    _products: [],
    //array per tenere traccia dei prodotti nel carrello
    //attributo privato dell'oggetto si interagisce tramite i metodi.
    
    addProducts: function (id) {
        //funzione per aggiungere un prodotto nell'array, filtrandolo per id
        let ins = AVAILABLE_PROD.filter(p => p.id === id)[0];
        console.log(ins);
        this._products.push(ins);
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
            if(p.promo) tot += (p.price * (1 - p.discount) / 100);
            else tot += p.promo;
        })
        return tot;
    },

    removeItem: function (id) {
        //elimina dall'array un prodotto dato il suo id
        const rem = this._products.pop(e => e.id === id);
        console.log("elemento eliminato dal carrello: ",rem);
    },

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
            sidePanel(this._products)
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
            this.addProducts(id);
            document.getElementById("cart-num-index").innerHTML = 
                this.getCartItems().toString();
                console.log("prodotti nel carrello: ",this._products)
        });
        return cart;
    },

}


const sidePanel = (arr) => {
    //elemento che prende tutta la pagina e contiene i due div
    const panel = document.createElement('div');
    // panel.id = "cart-side-panel";
    panel.setAttribute("class", "side-panel");
    const emptyHalf = document.createElement('div');
    emptyHalf.setAttribute("class", "transparent-side-panel");
    emptyHalf.addEventListener("click", function () {
        panel.style.display = 'none';
    });

    const cartHalf = document.createElement('div');
    cartHalf.setAttribute("class", "cart-side-panel");
    const close = document.createElement('a');
    close.setAttribute("class", "cart-btn");
    close.innerHTML = `&otimes; Close`;
    close.addEventListener("click", function () {
        panel.style.display = 'none';
    });
    cartHalf.append(close);

    //genero la lista di prodotti nel carrello   
    const ul = document.createElement('ul');
    arr.forEach((i, k) => {
        console.log("prodotto ", k, i);
    })

    panel.append(emptyHalf, cartHalf);
    document.body.append(panel);
}