import {ProductListResponse, ProductResponse} from "../types";

const apiUrl = 'https://reqres.in/api/products';

export function getProductsByPage(page: number = 1): Promise<ProductListResponse> {
    return fetch(`${apiUrl}?page=${page}&per_page=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
}

export function getProductById(productId: number): Promise<ProductResponse> {
    return fetch(`${apiUrl}?id=${productId}`)
        .then(response => {
            if (!response.ok) {
                return {error: `Product with id ${productId} does not exist`}
            }
            return response.json()
        })
}
