export interface Product {
    id: number
    name: string
    year: number
    color: string
}
export interface ProductListResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Product[]
    error?: string
}
export interface ProductResponse {
    data?: Product
    error?: string
}
