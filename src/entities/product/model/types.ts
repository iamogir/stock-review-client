import {StockEntry} from "entities/stockEntry";

export type ProductDto = {
    _id?: string,
    name: string,
    category: string,
    brand: string,
    unitWeight: string,
    status: boolean,
}

export type Product = {
    id?: string,
    name: string,
    category: string,
    brand: string,
    unitWeight: string,
    status: boolean,
}

export type ProductsInitState = {
    products: Product[] | undefined,
    stockEntries: StockEntry[] | undefined;
    loading: boolean;
    error: string | null;
}

export type AddingProductsInitState = {
    newProducts: Product[] | undefined;
    newEntries: StockEntry[] | undefined;
    error: string | null;
}

export type ProductsResponse = {
    products: Product[] | null;
}