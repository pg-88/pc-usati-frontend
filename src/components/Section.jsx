import "./Section.css"
import chromebook from "../utils/img/chromebook.png"
import smartphone from "../utils/img/smartphone.png"
import tablet from "../utils/img/tablet.png"
import laptop from "../utils/img/laptop.png"
import altro from "../utils/img/altro.png"


export default function Section({categoria, onClick}){
    let src = ''
    switch (categoria) {
        case 'laptop':
            src = laptop;
            break;
        case 'smartphone':
            src = smartphone;
            break;
        case 'tablet':
            src = tablet;
            break;
        case 'chromebook':
            src = chromebook;
            break;
        default:
            src = altro;
            break;
    }

    return(
        <button onClick={onClick} id={categoria}>
            <img src={src} alt={categoria} width={120}/>
            <h3>
                {categoria}
            </h3>
        </button>
    )
}