import {Product, ProductDto} from "../model/types.ts";

export function fromJSON(json: string): Product {
    const obj = JSON.parse(json);
    return fromServerObject(obj);
}

export function fromServerObject(obj: ProductDto): Product {
    return {
        id: obj._id,
        name: obj.name,
        category: obj.category,
        weight: obj.weight,
        unitWeight: obj.unitWeight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
        status: obj.status,
    }
}