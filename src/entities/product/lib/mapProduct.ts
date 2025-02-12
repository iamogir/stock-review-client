import {Product, ProductDto} from "../model/types.ts";

export function fromJSON(json: string): ProductDto {
    const obj = JSON.parse(json);
    return fromServerObject(obj);
}

export function fromServerObject(obj: ProductDto): Product{
    return {
        name: obj.name,
        category: obj.category,
        quantityKg: obj.quantityKg,
        unitWeight: obj.unitWeight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
        status: obj.status,
    }
    // new Product(obj.name, obj.category, obj.quantityKg, obj.unitWeight, obj.quantityUnits, obj.expirationDate, obj.createdAt, obj.updatedAt,
    //     obj.barcode, obj.supplier, obj.storageLocation, obj.status);
}