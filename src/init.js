import { AVAILABLE_PROD } from "./prodotti.js";
import { Cart } from "./carrello.js"

//inizializzo il carrello come variable globale
var ShoppingCart = Cart;


export function startApp(){
    /**All'apertura della pagina:
     * assegna il titolo
     * genera header e footer
     * menù richiamato da selCategoria
     */

    //manipolazione head
    document.title = "Negozio online - Shop";
    
    //estrapolo le categorie
    let categorie = []
    console.log("app avviata");
    AVAILABLE_PROD.forEach(element => {
        !categorie.includes(element.type) ? categorie.push(element.type) : undefined;
    });

    //elemento carrello

    //inserisco elementi nel DOM con le apposite funzioni
    document.body.append(header(),ShoppingCart.getTopElement() , navbar(categorie), iniMain(), foot());
}

const header = () => {
    /**genera header all'avvio dell'app */
    const content = document.createElement('header');
    content.setAttribute('class', 'top-page');

    //elemento titolo H1
    const tit1 = document.createElement('h1')
    tit1.appendChild(document.createTextNode("Lunga vita ai Devices"))
    tit1.setAttribute('class', 'top-page');
    tit1.id = 'main-title';

    //elemento sottotitpolo (p)
    const subH = document.createElement('p')
    subH.innerHTML =
        `<p id="sub-header" class="top-page sub-header">Usato è meglio che nuovo!</p>` ;
    
    //logo immagine
    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.width = 80;
    logo.src = "utils/logo.png"
        
    //inserimento nel DOM
    tit1.append(subH);
    content.append(logo, tit1);
    return content;
}

const foot = () => {
    /**genera il footer */
    let pie = document.createElement('footer');
    let indirizzo = document.createElement('address');
    indirizzo.title = "Riuso e Riciclo dispositivi tecnologici";
    indirizzo.append(document.createTextNode("Riuso e Riciclo dispositivi tecnologici"));
    pie.append(indirizzo);
    return pie;
}

const navbar = (arrCat) => {
    /**passato l'array con i nomi delle categgorie di prodotti genera in navbar
     * costituito da bottoni 
     */

    let element = document.createElement('nav');
    element.id = "cat-nav";
    element.setAttribute('class', 'navbar');
    let list = document.createElement('ul');
    list.setAttribute("class", "navbar")

    arrCat.forEach(e => {
        let item = document.createElement('li');
        item.id = `item-${e.toString()}`;

        let btn = document.createElement('button');
        btn.id = e;
        btn.append(
            document.createTextNode(`Categoria ${e.toString().toUpperCase()}`)
        );
        btn.addEventListener('click', (e) => {
            clickCat(e.target.id)});
        
        //inserimento nella DOM
        item.append(btn);
        list.append(item);
    })
    element.append(list);

    return element;
}

const iniMain = () => {

    //genero il main iniziale di default poi verrà manipolato
    let mainEl = document.createElement('main');
    //elementi per il main
    let txt = document.createTextNode(
        `Com'è bello usare i PC vecchi e fa bene all'ambiente!\n
        inserire qui il testo green washing che fa vendere tanto di questi tempi:
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel risus
        commodo viverra maecenas. In ornare quam viverra orci sagittis eu volutpat odio facilisis. 
        Nisi quis eleifend quam adipiscing vitae. Sollicitudin aliquam ultrices sagittis orci a scelerisque
        purus semper. Congue mauris rhoncus aenean vel elit scelerisque mauris. 
        Scelerisque viverra mauris in aliquam sem fringilla ut.   
        Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. 
        Id diam maecenas ultricies mi. Sapien et ligula ullamcorper malesuada proin libero nunc.`
        );
    //oggetto multimediale
    let video = document.createElement('iframe');
    video.width = 400;
    video.height = 240;
    video.src="https://www.youtube.com/embed/12zfutD9JxQ";
    video.title = "Old PC Commercial"
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    mainEl.append(txt, video);
    return mainEl;
}

function clickCat(id){ 
    /**filtra categoria e passa a cards gli elementi da visualizzare */
    console.log("Selezionato la categoria", id);
    let prods = AVAILABLE_PROD.filter((en) => en.type === id);
    console.log("prodotti trovati ", prods);
    showcase(prods);
}

const showcase = (arrProd) => {
    /**svuota il main e lo ripopola con le card  */
    //Lo svuota main:
    let mainEl = document.querySelector('main');
    mainEl.innerHTML = '';
    mainEl.setAttribute('class', 'showcase');
    let h = document.createElement('h3');
    h.append(`Selezionato la categoria ${arrProd[0].type}`);
    mainEl.append(h)
    document.title = `Negozio online - ${arrProd[0].type}`;
    //container per le card
    let content = document.createElement('div');
    content.setAttribute('class', 'grid-container');
    //array per elementi delle card
    let cardArr = [];

    //ciclo per popolare cardArr
    arrProd.forEach(p => {
        console.log("card per il prodotto: ", p)
        cardArr.push(card(p))
    })

    //inserimento DOM nel main
    content.append(...cardArr); //cardArr[0], cardArr[1], cardArr[2]... 
    mainEl.append(content);
}

const card = (article) => {
    /**ritorna una card costruita per l'oggetto passato come parametro*/
    //oggetto di base per le card
    let card = document.createElement('div');
    card.addEventListener("click", (e) => {
        let id = getId(e.target);
        console.log("Trovato id:", id);
        document.body.append(popUp(id));
    })
    card.setAttribute('class', 'card-item');
    card.setAttribute('id', `${article.id}`);
    //lista caratteristiche
    let list = document.createElement('ul');
    const brand = document.createElement('li');
    brand.append(`Marca: ${article.brand}`);
    const model = document.createElement('li');
    model.append(`Modello: ${article.model}`);
    const price = document.createElement('li');
    price.append(`Prezzo: ${article.price}`)
    list.append(brand, model, price);
    if(article.img !== undefined){
        const pic = document.createElement('img');
        pic.src = article.img;
        pic.setAttribute('class', 'card-img');
        card.append(pic);
    }
    card.append(list, ShoppingCart.getCardElement(article.id));
    if(article.promo) card.insertAdjacentElement('afterbegin', promoBanner());
    return card;
}

const promoBanner = () => {
    const banner = document.createElement('img');
    banner.src = "../utils/promo.png";
    banner.id = "banner-promo"
    return banner;
}

const popUp = (id) => {
    const detail = AVAILABLE_PROD.find(p => p.id === id);
    console.log(detail.specs);
    const shade = document.createElement('div');
    shade.id = "popup-transparent";
    // shade.addEventListener("click", () => document.body.removeChild(shade));
    let container = document.createElement('div');
    shade.append(container);
    container.classList.add("popup");
    //chiudere popup
    let close = document.createElement('span');
    close.id = "close-btn";
    close.append("⊗ Chiudi");
    close.addEventListener("click", () => document.body.removeChild(shade));
    //immagine prodotto
    const img = document.createElement('img');
    img.id = "popup-img";
    img.src = detail.img !== undefined ? detail.img : "../utils/logo.png";


    let specsTab = document.createElement('table');
    specsTab.classList.add("popup-table");
    const info = document.createElement('tr');
    //intestazione dettagli
    const infoH = document.createElement('th');
    infoH.append("Dettagli Prodotto")
    infoH.colSpan = 2;
    info.append(infoH);
    //dettagli
    const row1 = document.createElement('tr');
    const row2 = document.createElement('tr');
    [
        `Marca: ${detail.brand}\n`,
        `Modello: ${detail.model}\n`,
        `Prezzo: ${detail.price}\n`,
        `ID prodotto: ${detail.id}\n`
    ].forEach((el, cell) => {
        const det = document.createElement('td');
        det.append(el);
        if(cell < 2) row1.append(det);
        else row2.append(det);
    });

    //Specifiche Tecniche
    const spec = document.createElement('tr');
    //intestazione specifiche
    const specH = document.createElement('th');
    specH.append("Specifiche Tecniche");
    specH.colSpan = 2;
    spec.append(specH);
    
    //inserisco i pezzi di tabella nella DOM
    specsTab.append(infoH, row1, row2, specH, spec)

    //Righe specifiche tecniche
    Object.entries(detail.specs).forEach((v) => {
        console.log("Oggetto specs: ", v);
        const specR = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2; 
        cell.append(`${v[0].toLocaleUpperCase()} → ${v[1]}\n`);
        specR.append(cell);
        console.log("riga spec ", specR);
        specsTab.append(specR);
    });
    
    
    //Manipolazione DOM
    container.append(close, img, specsTab);
    const banner = promoBanner();
    banner.classList.add("popup-banner");
    banner.id = "promo-banner-popup";
    
    if(detail.discount) {
        const discountStr = document.createElement('p')
        discountStr.append(`Sconto: ${detail.discount}%\n`);
        discountStr.classList.add("discount-text");
        container.append(discountStr, banner);
    }
    return shade;
}

function getId(element){
    //risale l'albero della DOM delle card per trovare l'id del div container
    if(element.tagName === 'DIV'){
        let id = element.id;
        return id;
    } else {
        return getId(element.parentElement);
    }
}