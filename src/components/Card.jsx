import { useState } from "react";

import "./Card.css"
import Details from "./Details";



export default function Card({prodObj}){
    //renderizza la card per il prodotto passato
    //contiene l'elemento Details che viene visualizzato solo cliccando

    const [specs, setSpecs] = useState([]);
    const showDetails = () => {
        setSpecs(Object.entries(prodObj.specs));
    }
    return(
        <div>
            <button 
                id={prodObj.id}
                className="prodCard" 
                onClick={e => showDetails()}
            >
                <h3>
                    {`${prodObj.type.toLocaleUpperCase()} ${prodObj.brand} Modello: ${prodObj.model}`}
                </h3>
                <img 
                    src={prodObj.img} 
                    alt=""
                    className="prodImg"
                />

            {<Details specs={specs} />}
            </button>
        </div>
        
    );
}