import {Product, ProductDto, StockEntry, StockEntryDto} from "../model/types.ts";

// export function fromJSON(json: string): StockEntryDto | ProductDto {
//     const obj = JSON.parse(json);
//     return fromServerStockEntryObject(obj);
// }

export function fromServerStockEntryObject(obj: StockEntryDto, products: Product[]): StockEntry {

    return {
        id: obj._id,
        productInfo: findProductOfEntry(obj.productId, products),
        weight: obj.weight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
    }
}

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

function findProductOfEntry(productId: string, products: Product[]): Product | undefined  {
    return products.find(p => p.id === productId);
}