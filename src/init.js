import { AVAILABLE_PROD } from "./prodotti.js";


export function startApp(){
    /**All'apertura della pagina:
     * assegna il titolo
     * genera header e footer
     * menù richiamato da selCategoria
     */

    document.title = "Negozio online - Shop";
    document.body.appendChild(header());
    let top = document.createElement('header');
    top.id = "page-header";

    let categorie = []
    console.log("app avviata");
    AVAILABLE_PROD.forEach(element => {
        console.log("elemento",element.type);
        !categorie.includes(element.type) ? categorie.push(element.type) : undefined;
    });

    //genero il main (unico ma verrà poi manipolato)
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
    
    let video = document.createElement('iframe');
    video.width = 400;
    video.height = 240;
    video.src="https://www.youtube.com/embed/12zfutD9JxQ";
    video.title = "Old PC Commercial"
    video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    mainEl.append(txt, video);
    document.body.lastElementChild.after(navbar(categorie), mainEl);
}

let header = () => {
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

let navbar = (arrCat) => {
    /**passato l'array con i nomi delle categgorie di prodotti genera in navbar
     * costituito da bottoni 
     */

    let element = document.createElement('nav');
    element.id = "cat-nav";
    element.setAttribute('class', 'navbar');
    let list = document.createElement('ul');

    arrCat.forEach(e => {
        let item = document.createElement('li');
        item.id = `item-${e.toString()}`;

        let btn = document.createElement('button');
        btn.id = e;
        btn.append(
            document.createTextNode(`Categoria ${e.toString().toUpperCase()}`)
        );
        btn.addEventListener('click', (e) => {clickCat(e.target.id)});
        
        //inserimento nella DOM
        item.append(btn);
        list.append(item);
    })
    element.append(list);

    return element;
} 

function clickCat(id){ 
    /**filtra categoria e passa a cards gli elementi da visualizzare */
    console.log("Selezionato la categoria", id);
    let prods = AVAILABLE_PROD.filter((en) => en.type === id);
    console.log("prodotti trovati ", prods);

    cards(prods);
}

let cards = (arrProd) => {
    /**card sono anchor che stanno nel main
     * prima di tutto svuota il main, quindi genera gli elementi necessari
     * per ogni card, quindi ritortna il main popolato dalle card.
     */
    arrProd.forEach(p => {
        console.log(`Prodotto: ${p.type}, ${p.id}`);
    });
}