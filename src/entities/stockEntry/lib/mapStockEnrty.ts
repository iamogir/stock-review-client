import {Product} from "entities/product";
import {StockEntry, StockEntryDto} from "entities/stockEntry";

export function fromServerStockEntryObject(obj: StockEntryDto, products: Product[]): StockEntry {

    const temp: StockEntry = {
        id: obj._id,
        productInfo: findProductOfEntry(obj.productId, products),
        weight: obj.weight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
    }
    if (obj.barcode)
        temp.barcode = obj.barcode;

    return temp;
}

export function toStockEntryDto(obj: StockEntry): StockEntryDto {

    const temp: StockEntryDto = {
        productId: '',
        weight: obj.weight,
        quantityUnits: obj.quantityUnits,
        expirationDate: obj.expirationDate,
        supplier: obj.supplier,
        storageLocation: obj.storageLocation,
    }

    if (obj.productInfo?.id)
        temp.productId = obj.productInfo.id;
    if (obj.barcode)
        temp.barcode = obj.barcode;

    return temp;
}

function findProductOfEntry(productId: string, products: Product[]): Product  {
    const temp: Product | undefined = products.find(p => p.id === productId);
    if (temp)
        return temp;
    else
        alert('Product not found, check the product of your stock entry.');
    return <Product>{}; //TODO check this
}
