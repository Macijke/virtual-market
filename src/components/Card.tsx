import { Link } from 'react-router-dom';
import {Market} from "../models/Market";
import {useState} from "react";

const Card = ({ offer }) => {
    const floatBarColors = getFloatBarColors(offer.float);
    const offerDate = new Date(offer.creationDate);
    const offerDateString = offerDate.toLocaleDateString();
    const rarityClass = getRarityColor(offer.rarity);
    const perks = getPerks(offer);
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    return (
        <Link to={`/offer/${offer.uniqueId}`}>
            <div className="max-w-xs bg-gray-800 text-white rounded-lg shadow-lg p-5 transform transition duration-200 hover:scale-105 hover:cursor-pointer z-10">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{offerDateString}</span>
                    <button className="focus:outline-none">
                        <svg
                            className="w-7 h-7 text-gray-400 hover:text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75 C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" />
                        </svg>
                    </button>
                </div>

                <div className="relative flex justify-center mb-4" style={{ width: '16rem' }}>
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-15"
                        style={{
                            backgroundImage: 'url("./images/bg/ak-47.png")',
                        }}
                    ></div>
                    <img
                        src={offer.image}
                        alt={offer.name}
                        className="w-64 h-auto relative z-10"
                    />
                </div>

                <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-400 mb-1">
                        $ <span className="text-white">{offer.price}</span>
                    </div>
                    <div className="text-sm text-gray-400">Sugerowana cena: ${offer.price}</div>
                </div>

                <div>
                    <div className="text-center text-2xl font-semibold">{offer.name}</div>
                    <div className="text-center text-gray-400">{offer.weapon}</div>
                    <div className="flex justify-center items-center mt-2">
                        <div className={`${rarityClass} text-sm font-bold px-4 py-1 rounded-full relative`}>
                            {offer.rarity.toUpperCase()}
                        </div>
                        {
                            perks.map((perk, index) => (
                                <div key={index} className="ml-2 bg-green-500 text-xs font-bold px-2 py-1 rounded-full relative" onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
                                    {perk.title}
                                    {isTooltipVisible && (
                                        <div className="absolute bottom-full -ml-24 mb-2 p-2 bg-gray-700 text-white text-xs rounded shadow-lg w-max">
                                            {perk.message}
                                        </div>
                                    )}
                                </div>
                            ))
                        }

                    </div>

                    <div className="mt-4 relative">
                        <div
                            className="absolute -top-3 w-4 h-4 bg-green-400 transform rotate-45"
                            style={{
                                left: `calc(${(offer.float * 100).toFixed(2)}% - 0.5rem)`
                            }}
                        ></div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 flex overflow-hidden">
                            {floatBarColors.map((section, index) => (
                                <div
                                    key={index}
                                    className={`${section.color} h-2.5`}
                                    style={{
                                        width: `${section.range * 100}%`
                                    }}
                                ></div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                            <div>{getFloatQuality(offer.float).full}</div>
                            <div className="text-right">{offer.float}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};


const getFloatBarColors = (float: number): { color: string; range: number }[] => [
    { color: "bg-green-900", range: 0.07 },
    { color: "bg-green-500", range: 0.08 },
    { color: "bg-yellow-500", range: 0.23 },
    { color: "bg-orange-500", range: 0.07 },
    { color: "bg-red-500", range: 0.55 },
];

const getRarityColor = (rarity: string): string => {
    const rarityColors = {
        common: "bg-gray-200",
        rare: "bg-blue-600",
        mythical: "bg-purple-500",
        legendary: "bg-pink-400",
        immortal: "bg-red-500",
        covert: "bg-yellow-500",
    };

    return rarityColors[rarity] || "bg-gray-300";
};

const getPerks = (offer: Market): [{title: string, message: string}] => {
    let perks = [];
    if (offer.float < 0.0090) {
        perks.push({title: "NISKI FLOAT", message: "Ten przedmiot ma bardzo niski float!"});
    }

    if (offer.addons.nameTag) {
        perks.push({title: "NAME TAG", message: `Przedmiot posiada specjalną nazwę: "${offer.addons.nameTag}"!`});
    }

    if (offer.price < offer.avgPrice) {
        perks.push({title: "OKAZJA", message: `Przedmiot jest tańszy niż średnio sprzedawany o $${offer.avgPrice - offer.price}!`});
    }

    return perks;
}

const getFloatQuality = (floatValue: number): {full: string, short: string} => {
    if (floatValue <= 0.07) return { full: "Factory New", short: "FN" };
    if (floatValue > 0.07 && floatValue <= 0.15) return { full: "Minimal Wear", short: "MW" };
    if (floatValue > 0.15 && floatValue <= 0.38) return { full: "Field-Tested", short: "FT" };
    if (floatValue > 0.38 && floatValue <= 0.45) return { full: "Well-Worn", short: "WW" };
    if (floatValue > 0.45 && floatValue <= 1) return { full: "Battle-Scarred", short: "BS" };
    return { full: "Unknown", short: "UNK" };
};

export default Card;
