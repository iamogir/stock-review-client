import {Product} from "entities/product";

export type StockEntryDto = {
    _id?: string,
    productId: string,
    weight: number,
    quantityUnits: number,
    expirationDate: Date,
    barcode?: string,
    supplier: string,
    storageLocation: string,

}

export type StockEntry = {
    id?: string,
    productInfo: Product,
    weight: number,
    quantityUnits: number,
    expirationDate: Date,
    barcode?: string,
    supplier: string,
    storageLocation: string,
}

export type FilteredProductsInitState = {
    expiredProducts: StockEntry[] | undefined;
    expiringSoonProducts: StockEntry[] | undefined;
    loading: boolean;
    error: string | null;
}

export type StockEntryResponse = {
    stockEntries: StockEntry[] | null;
}