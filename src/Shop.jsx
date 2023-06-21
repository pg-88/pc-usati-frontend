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
    return(
        <div>
            <Header />

            <ProdList />

        </div>
    );
}