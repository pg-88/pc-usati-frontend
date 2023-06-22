import Card from "./Card"
import "./ProdList.css"

export default function ProdList({arrProducts}){
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