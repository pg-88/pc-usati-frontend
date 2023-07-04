import { AVAILABLE_PROD } from "./prodotti.js";

export function startApp(){
    document.title = "Negozio online - Shop";
    console.log("app avviata");
    AVAILABLE_PROD.forEach(element => {
        console.log("elemento",element)        
    });
}