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

    console.log("app avviata");
    AVAILABLE_PROD.forEach(element => {
        console.log("elemento",element)        
    });
}

let header = () => {
    const content = document.createElement('header');
    const tit1 = document.createElement('h1')
    tit1.appendChild(document.createTextNode("Lunga vita ai Devices"))
    tit1.setAttribute('class', 'top-page');
    tit1.id = 'main-title';
    const subH = document.createElement('p')
    subH.innerHTML =
        `<p class="top-page sub-header">Usato è meglio che nuovo!</p>` 
    tit1.append(subH);
    content.append(tit1);
    const logo = document.createElement('img');
    logo.id = 'logo';
    // logo.style.display = 'none';
    logo.width = 80;
    logo.src = "utils/logo.png"
    content.append(logo);
    return content;
}


function selCategoria(){

}