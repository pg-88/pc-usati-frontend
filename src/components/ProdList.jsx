import Card from "./Card"
import Details from "./Details";
import "./ProdList.css"

export default function ProdList({arrProducts}){
    let cards = [];
    let clickedDetail = false;
    for(let i = 0; i < arrProducts.length; i++){
        cards.push(
            <Card 

                className="gridElement"
                prodObj={arrProducts[i]}
                key={arrProducts[i].id}
                onClick={e => generateDetail(e)}
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

function generateDetail(e){

}