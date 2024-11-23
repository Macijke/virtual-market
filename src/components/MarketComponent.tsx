import { useEffect, useState } from "react";
import Card from "./Card.tsx";
import { Market } from "../models/Market";
import HeaderComponent from "./HeaderComponent.tsx";

function MarketComponent() {
    const [offers, setOffers] = useState<Market>([] as any);

    useEffect(() => {
        fetch(`http://localhost:3003/offers`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((response) => response.json())
            .then((json) => {
                setOffers(json);
            })
            .catch(console.error);
    }, []);

    return (
        <>
        <HeaderComponent />
        <div className="bg-[#1D2328] min-h-screen p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {offers.map((offer) => (
                    <Card offer={offer} key={offer.uniqueId} />
                ))}
            </div>
        </div>
        </>
    );
}

export default MarketComponent;
