export type HomePageState = {
    products: Product[],
    loading: boolean,
    error: string
}

export type ResponseProducts = {
    products: Product[]
}