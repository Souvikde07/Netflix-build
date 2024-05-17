import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs, query, where  } from 'firebase/firestore';
import "./PlanScreen.css"

function PlanScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const productCol = collection(db, 'products');
            const q = query(productCol, where('active', '==', true));
            const querySnapshot = await getDocs(q);
            const products = {};
            for(const productDoc of querySnapshot.docs){
                products[productDoc.id] = productDoc.data();
                const priceSnap = await getDocs(collection(productDoc.ref,'prices'));
                priceSnap.docs.forEach(price =>{
                    products[productDoc.id].prices = {
                        pricesId: price.id,
                        priceData: price.data(),
                    };
                });
            }
            setProducts(products);
        };
        getProducts();
    }, []);

    console.log(products);

return (
    <div className='planScreen'>PlanScreen</div>
)
}

export default PlanScreen;