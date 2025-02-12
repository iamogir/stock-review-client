export interface Product {
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

export type ProductInitState = {
    products: Product[] | undefined;
    loading: boolean;
    error: string | null;
}

export type ResponseProducts = {
    products: Product[]
}