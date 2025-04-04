import {Product, ProductDto, ProductsResponse} from "entities/product";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fromServerProductObject} from "entities/product";
import {
    getAllStockEntriesAsyncAction,
    getExpiredProductsAsyncAction,
    getExpiringSoonProductsAsyncAction
} from "features/products";
import {EXPIRING_SOON_DAYS} from "shared/consts";

const API = import.meta.env.VITE_API_URL;

export const getAllProductsAsyncAction = createAsyncThunk<ProductsResponse, void, { rejectValue: string }>(
    'product/get_all_products',
    async(_, thunkAPI): Promise<ProductsResponse | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {

            // const {products} = thunkAPI.getState() as RootState; TODO: check best functional
            // const temp = products.products;
            // if (temp && temp.length > 0) {
            //     return thunkAPI.rejectWithValue('Products are already loaded')
            // }

            console.log('Get All Products Loading')

            const productsArr: Product[] = [];
            const response = await fetch(API + 'products/get_all_products');
            if (response.status === 200 || response.status === 304) {
                const json = await response.json();

                json.map((pr: ProductDto) => productsArr.push(fromServerProductObject(pr)));

                if (productsArr.length === 0) {
                    throw new Error("no data " + response.statusText)
                } else {
                    return { products: productsArr }
                }
            } else {
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.error('get_all_products ' + error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)
export const addNewProductAsyncAction = createAsyncThunk<Product, ProductDto, { rejectValue: string }>(
    'product/add_new_product',
    async (newProduct: ProductDto, thunkAPI): Promise<ProductDto | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            console.log('Add New Product Loading')

            const response = await fetch(API + 'products/add_new_product', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newProduct)
            });

            if (response.status === 201) {
                const json = await response.json();
                const returnedProduct: Product = fromServerProductObject(json);

                if (!returnedProduct) {
                    throw new Error('Unable to add product ' + response.statusText);
                } else {
                    return returnedProduct;
                }
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log('add_new_product', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)

export const addNewProductsStackAsyncAction = createAsyncThunk<Product[], ProductDto[], { rejectValue: string }>(
    'product/add_new_products_stack',
    async (newProductsArr: ProductDto[], thunkAPI): Promise<Product[] | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            console.log('Add New Products Stack')

            const response = await fetch(API + 'products/add_new_products_stack', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(newProductsArr)
            });

            if (response.status === 201) {
                const json = await response.json();
                const returnedProducts: Product[] = json.map((pr: ProductDto) => fromServerProductObject(pr));

                if (returnedProducts.length === 0) {
                    throw new Error('Unable to add products ' + response.statusText);
                } else {
                    return returnedProducts;
                }
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.log('add_new_products_stack', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)

export const deleteProductByIdAsyncAction = createAsyncThunk<string, string, { rejectValue: string }>(
    'product/delete_product_by_id',
    async (id: string, thunkAPI): Promise<string | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        try {
            if (id === '')
                throw new Error('NO ID !!!')

            const response = await fetch(API + 'products/delete_product_by_id/' + id, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json"},
            });

            if (response.status === 200 || response.status === 204) {
                const deletedId: string = await response.json();
                try {
                    await Promise.all([
                        thunkAPI.dispatch(getAllStockEntriesAsyncAction()),
                        thunkAPI.dispatch(getExpiredProductsAsyncAction()),
                        thunkAPI.dispatch(getExpiringSoonProductsAsyncAction(EXPIRING_SOON_DAYS))
                    ]);
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : 'Something went wrong');
                }


                return deletedId;
            } else {
                throw new Error(response.statusText);
            }

        } catch (error) {
            console.log('delete_product_by_id', error);
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Something went wrong'
            );
        }
    }
)
