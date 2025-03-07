import {Product, ProductDto, StockEntry, StockEntryDto} from "../model/types.ts";

// export function fromJSON(json: string): StockEntryDto | ProductDto {
//     const obj = JSON.parse(json);
//     return fromServerStockEntryObject(obj);
// }

export function fromServerStockEntryObject(obj: StockEntryDto): StockEntry {
    console.log(obj.productId)

    return {
        id: obj._id,
        productId: obj.productId,
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