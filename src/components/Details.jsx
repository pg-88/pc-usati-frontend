export default function Details({specs}){
    //crea la lista con i dettagli del prodotto
    return(
        <ul>
            {specs.map(row => <li>{`${row[0]}: ${row[1]}`}</li>)}

        </ul>

    )
}
