export type ProductDto = {
    _id: string,
    name: string,
    category: string,
    weight: number,
    unitWeight: string,
    quantityUnits: number,
    expirationDate: Date,
    createdAt: Date,
    updatedAt: Date,
    barcode?: string,
    supplier: string,
    storageLocation: string,
    status: boolean,
}

export interface Product {
    id?: string,
    name: string,
    category: string,
    weight: number,
    unitWeight: string,
    quantityUnits: number,
    expirationDate: Date,
    supplier: string,
    storageLocation: string,
    status: boolean,
}

export type ProductsInitState = {
    products: Product[] | undefined;
    // expiredProducts: Product[] | undefined;
    loading: boolean;
    error: string | null;
}

export type FilteredProductsInitState = {
    expiredProducts: Product[] | undefined;
    expiringSoonProducts: Product[] | undefined;
    loading: boolean;
    error: string | null;
}

export type ProductsResponse = {
    products: Product[] | null;
}

export type FormatObject = {
    key: string,
    value: string
}