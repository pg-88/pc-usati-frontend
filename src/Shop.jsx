import { useState } from "react";

import Header from "./components/Header";
import Section from "./components/Section";
import ProdList from "./components/ProdList";

import FAKE_DB_DATA from "./utils/Response";



export default function Shop(){
    const [category, setCategory] = useState('');
    const categories = FAKE_DB_DATA.map(en => Object.keys(en))[0];
    const prod_family = categories.map(en => 
        <Section 
            categoria={en} 
            onClick={e => {
                console.log('aggiorno la categoria con useState:', e.target.id);
                setCategory(e.target.id);
                let products = FAKE_DB_DATA.find(cat => cat === category.toString());
                console.log(category)
                console.log('selected category products', products);
            }}
            key={en.toString()}/>);

    return(
        <div>
            <Header />
            {prod_family}
            <ProdList />

        </div>
    );
}