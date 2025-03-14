import {Product, ProductDto} from "entities/product";

// export function fromJSON(json: string): StockEntryDto | ProductDto {
//     const obj = JSON.parse(json);
//     return fromServerStockEntryObject(obj);
// }

export function fromServerProductObject(obj: ProductDto): Product {
    return {
        id: obj._id,
        name: obj.name,
        category: obj.category,
        brand: obj.brand,
        unitWeight: obj.unitWeight,
        status: obj.status,
    }
}