import {RootState} from "app/redux";

export function checkAvailabilityProducts({ products }: RootState) {
    const productsArr = products.products;
    if (!productsArr) {
        throw new Error('No products are found');
    }
    return productsArr;
}