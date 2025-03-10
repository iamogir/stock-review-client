import {RootState} from "app/redux";

export function checkAvailabilityProducts({ products }: RootState) { //TODO: remove any type
    const productsArr = products.products;
    const stockEntriesArr = products.stockEntries;
    if (!productsArr) {
        throw new Error('No products are found');
    }
    if (stockEntriesArr && stockEntriesArr.length > 0 || productsArr && productsArr.length > 0) {
        throw new Error('Entries are already loaded');
    }
    return productsArr;
}