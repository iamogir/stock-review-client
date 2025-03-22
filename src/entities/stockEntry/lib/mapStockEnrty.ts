import {Product} from "entities/product";
import {StockEntry, StockEntryDto} from "entities/stockEntry";

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

function findProductOfEntry(productId: string, products: Product[]): Product | undefined  {
    return products.find(p => p.id === productId);
}
