import "./Card.css"


export default function Card({prodObj}){

    return(
        <button 
        id={prodObj.id}
        onClick={() => {
            console.log(`cliccatto ${prodObj.id}`)

        }
    }
        className="prodCard"  
        >
            <h3>
                {`${prodObj.type.toLocaleUpperCase()} ${prodObj.brand} Modello: ${prodObj.model}`}
            </h3>
            <img 
                src={prodObj.img} 
                alt=""
                className="prodImg"
            />
        </button>
    );
}

// function openModal(e){
    
// }