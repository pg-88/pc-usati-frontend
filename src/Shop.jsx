import { useState } from "react";

import Header from "./components/Header";
import Section from "./components/Section";
import ProdList from "./components/ProdList";

import AVAILABLE_PROD  from "./utils/Response";


export default function Shop(){
    const [category, setCategory] = useState('');
    let catList = [];
    AVAILABLE_PROD.forEach(p => {
        catList.includes(p.type) ? 
        console.log(`category ${p.type} alredy present`) :
        catList.push(p.type);
        });
    console.log('categorie prodotti: ', catList);
    const switchCat = function (e) {
        //uso currentTarget perché con target prende il titolo o il bottone
        //in funzione della posizione in cui avviene il click
        console.log(e.currentTarget.id);
        setCategory(e.currentTarget.id);
    }
    

    return(
        <div>
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
            <ProdList />

        </div>
    );
}