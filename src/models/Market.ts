export interface Market {
    creationDate: string,
    name: string,
    weapon: string,
    price: number,
    avgPrice: number,
    seller: string,
    buyer?: string,
    rarity: string,
    seed: number,
    float: number,
    image: string,
    uniqueId: string
    addons: Addons
}

export interface Addons {
    nameTag: string,
    stickers: string[]
}
