export default function Details({specs, render}){


    return(
        <div className="details">
            <ul>
                {specs.map((k,v) => 
                    <li>{`${k.toString()}: ${v.toString()}`}</li>
                )}
            </ul>
        </div>

    )
}
