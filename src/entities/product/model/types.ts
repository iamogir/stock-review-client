export type ProductDto = {
    _id?: string,
    name: string,
    category: string,
    brand: string,
    unitWeight: string,
    status: boolean,
}

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

export type Product = {
    id?: string,
    name: string,
    category: string,
    brand: string,
    unitWeight: string,
    status: boolean,
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

export type ProductsInitState = {
    products: Product[] | undefined,
    stockEntries: StockEntry[] | undefined;
    // expiredProducts: Product[] | undefined;
    loading: boolean;
    error: string | null;
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

export type ProductsResponse = {
    products: Product[] | null;
}

export type FormatObject = {
    key: string,
    value: string
}