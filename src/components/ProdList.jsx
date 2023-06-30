import Card from "./Card"

import "./ProdList.css"

export default function ProdList({arrProducts}){
    //prende un array di prodotti e li renderizza come cards
    let cards = [];

    for(let i = 0; i < arrProducts.length; i++){
        cards.push(
            <Card 

                className="gridElement"
                prodObj={arrProducts[i]}
                key={arrProducts[i].id}
            />)
    }


    return(
        <div 
            className="gridContainer"
        >
            {cards}
        </div>
        );
}