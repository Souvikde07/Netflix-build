import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { collection, getDocs, query, where  } from 'firebase/firestore';
import "./PlanScreen.css"
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
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
    const loadCheckout = async (priceId) => {
        const docRef = await collection(db,'customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async(snap)=>{
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`WOH! WOH! WOH! An error occured : ${error.message}`);
            }

            if (sessionId) {
                const stripe = await loadStripe('pk_test_51PEsdCRrIg3NWNoV5D4g2E36fKr1DfvQpeGhL6CvRa8hsuHCxnEYKfMbBByK9aHWYE342MborkW6QT2mGukQCKO800K2thOGlO');
                stripe.redirectToCheckout({ sessionId });
            }
        })
    }
return (
    <div className='planScreen'>
        {Object.entries(products).map(([productId, productData]) => {
            //TODO: add some logic to check if the user sub is active.
            return(
                <div className='planScreen_plan'>
                    <div className='planScreen_info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>

                    <button onClick={() => loadCheckout(productData.prices.pricesId)}>
                        Subscribe
                    </button>
                </div>
            );
        })}
    </div>
);
}

export default PlanScreen;