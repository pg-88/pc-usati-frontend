import "./Section.css"

export default function Section({categoria, onClick}){

    return(
        <button onClick={onClick} id={categoria}>
            {/* <img src={} alt={categoria} /> */}
            <h3>
                {categoria}
            </h3>
        </button>
    )
}