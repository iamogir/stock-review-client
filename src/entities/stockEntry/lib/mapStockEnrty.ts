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

export function toStockEntryDto(obj: StockEntry): StockEntryDto {

    const temp: StockEntryDto = {
        productId: '',
        weight: obj.weight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        // barcode?: obj.barcode,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
    }

    if (obj.productInfo?.id)
        temp.productId = obj.productInfo.id;
    if (obj.barcode)
        temp.barcode = obj.barcode;

    return temp;
}

function findProductOfEntry(productId: string, products: Product[]): Product | undefined  {
    return products.find(p => p.id === productId);
}
