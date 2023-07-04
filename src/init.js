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

    console.log(document.body.lastElementChild);
    document.body.lastElementChild.after(navbar(categorie));

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

    arrCat.forEach(e => {
        let btn = document.createElement('button');
        btn.id = e;
        btn.append(
            document.createTextNode(`Categoria ${e.toString().toUpperCase()}`)
        );
        btn.addEventListener('click', (e) => {clickCat(e.target.id)});
        element.append(btn);
    })
    return element;
} 

function clickCat(id){ 
    /**filtra categoria e passa a cards gli elementi da visualizzare */
    console.log("Selezionato la categoria", id);
    let prods = AVAILABLE_PROD.filter((en) => en.type === id);
    console.log("prodotti trovati ", prods);

    cards(prods);
}