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
            this._products = this._products.slice(i, i+1);
            console.log("Elementi ancora nel carrello: ", this._products);
            this._sidePanel(this._products);
        }
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
            this._sidePanel(this._products)
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
            document.getElementById("cart-num-index").innerHTML = 
                this.getCartItems().toString();
                console.log("prodotti nel carrello: ",this._products)
        });
        return cart;
    },

    _sidePanel: function (arr) {
        //elemento che prende tutta la pagina e contiene i due div
        const panel = document.createElement('div');
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
        arr.forEach((i) => {
            console.log("prodotto ", i.model, i.brand);
            ul.append(this._listProd(i));
        })
        cartHalf.append(ul);
    
        panel.append(emptyHalf, cartHalf);
        document.body.append(panel);
    },
    
    _listProd: function (prod) {
        /** genera gli item da inserire nella lista del carrello*/
        const el = document.createElement('li');
    
        el.append(`${prod.brand} ${prod.model} \t  ➡ `);
        el.append(`\t ${prod.promo ? (prod.price * (1 - prod.discount / 100)).toFixed(2) : prod.price} €`)
        const addBtn = document.createElement('button');
        addBtn.append('+');
        addBtn.addEventListener('click', this.addProduct(prod.id));
        const rmBtn = document.createElement('button');
        rmBtn.append('-');
        rmBtn.addEventListener('click',() => {
            this.removeProduct(prod.id)
            console.log("rimuovere ", prod.id, "rimangono", this._products)
        });
        el.append(addBtn, rmBtn);
        return el;
    },
}