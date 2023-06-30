import { useState } from "react";

import Header from "./components/Header";
import Section from "./components/Section";
import ProdList from "./components/ProdList";

import AVAILABLE_PROD  from "./utils/Response";
// import ReadImg from "./components/ReadImg";


export default function Shop(){
    /**Componente principale
     * scorre l'array degli oggetti in vendita ed estrapola le categorie,
     * genra un bottone (Section) per ogni categoria, cliccando su un bottone
     * viene renderizzata la lista di prodotti di quella categoria.
     */
    const [category, setCategory] = useState('');

    let catList = [];
    AVAILABLE_PROD.forEach(p => {
        if(!catList.includes(p.type)) catList.push(p.type);
        });
    const switchCat = function (e) {
        //uso currentTarget perché con target prende il titolo o il bottone
        //in funzione della posizione in cui avviene il click
        setCategory(e.currentTarget.id);
    }
    return(
        <div>
            {/* <ReadImg /> */}
            <Header />
            {
                catList.map(c => (
                    <Section 
                        key={c.toString()}
                        categoria={c}
                        onClick={e => switchCat(e)}
                    />
                ))
            }
            <ProdList arrProducts={AVAILABLE_PROD.filter(p => p.type === category)}/>

        </div>
    );
}