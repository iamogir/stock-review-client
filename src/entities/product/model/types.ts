export type ProductDto = {
    name: string,
    category: string,
    quantityKg: number,
    unitWeight: string,
    quantityUnits: number,
    expirationDate: Date,
    createdAt: Date,
    updatedAt: Date,
    barcode: string,
    supplier: string,
    storageLocation: string,
    status: string,
}

export interface Product {
    name: string,
    category: string,
    quantityKg: number,
    unitWeight: string,
    quantityUnits: number,
    expirationDate: Date,
    supplier: string,
    storageLocation: string,
    status: string,
}

export type ProductsInitState = {
    products: Product[] | undefined;
    loading: boolean;
    error: string | null;
}

export type ProductsResponse = {
    products: Product[] | null;
}